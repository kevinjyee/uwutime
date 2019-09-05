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
    end

    attributes
  end

  def recipe_event_id
    params.try(:recipe_event).try(:id) || params[:id]
  end

  def recipe_id
    params[:recipe_id] || params[:id]
  end

  def recipe
    Recipe.find(recipe_id)
  end
end

