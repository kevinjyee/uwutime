class RecipeEventsController < ApplicationController
  def update
    @recipe = recipe.update_attributes(recipe_event_params)
    if @recipe
      recipe_event = RecipeEvent.find(recipe.id)
      render json: recipe_event
    else
      render json: recipe.errors, status: :unprocessable_entity
    end
  end

  def show
    @recipe_event = RecipeEvent.find(recipe_id)
    render json: @recipe_event
  end

  protected

  def recipe_event_params
    attributes = (params[:recipe_event] || ActionController::Parameters.new({})).permit(
        :id,
        recipe_mash_tasks: [:id,
                            :name,
                            :step_order,
                            recipe_mash_steps: [:id, :name, :display_name,
                                                :temperature, :temperature_unit,
                                                :duration_hours, :step_order]
        ])

    if (attributes[:recipe_mash_tasks])
      attributes[:recipe_mash_tasks].collect! {|attr| attr.merge!({ recipe_mash_steps_attributes: attr.delete(:recipe_mash_steps)})}
      attributes.merge!({ recipe_mash_tasks_attributes: attributes.delete(:recipe_mash_tasks) })

      # delete recipe mash task
      if destroy?
        attributes[:recipe_mash_tasks_attributes].each { |mash_task|
          mash_task[:_destroy] = true
        }
      end


      # if the mash tasks already exist check which ids no longer exist
      sparse_mash_tasks_map = {}
      attributes[:recipe_mash_tasks_attributes].map { |task| sparse_mash_tasks_map[task[:id]] = {mash_task_id: task[:id], mash_step_ids: task[:recipe_mash_steps_attributes].map{ |step| step[:id].to_i} } }
      ids_to_remove = []
      attributes[:recipe_mash_tasks_attributes].each do |mash_task_attr|
        # mash task exist since it has an id
        if(sparse_mash_tasks_map[mash_task_attr[:id]][:mash_task_id])
          sparse_mash_task = sparse_mash_tasks_map[mash_task_attr[:id]]
          ids_to_remove = existing_recipe_mash_step_ids(sparse_mash_task[:mash_task_id]) - sparse_mash_task[:mash_step_ids]
          if ids_to_remove.present?
            ids_to_remove.map { |removed_id| mash_task_attr[:recipe_mash_steps_attributes] << { id: removed_id, _destroy: true } }
          end
        end
        end
      end

    attributes
  end

  def recipe_event_id
    params.try(:recipe_event).try(:id) || params[:id]
  end

  def recipe_id
    params[:recipe_id] || params[:id]
  end

  def destroy?
    params[:destroy]
  end

  def recipe
    Recipe.find(recipe_id)
  end

  def existing_recipe_mash_step_ids(recipe_mash_task_id)
    RecipeMashTask.find(recipe_mash_task_id).recipe_mash_steps.pluck(:id)
  end
end

