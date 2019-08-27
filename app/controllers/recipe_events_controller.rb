class RecipeEventsController < ApplicationController
  def update
    recipe = Recipe.new(recipe_fermentable_params)
    if recipe.save
      recipe_event = RecipeEvent.find(recipe.id)
      render json: recipe_event
    else
      render json: recipe.errors, status: :unprocessable_entity
    end
  end

  def show
    @recipe_fermentable = RecipeEvent.find(recipe_event_id)
    render json: @recipe_fermentable
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


    if (attributes[:recipe_ingredient])
      attributes.merge!({ recipe_ingredient_attributes: attributes.delete(:recipe_ingredient) })

      attributes[:recipe_ingredient_attributes][:ingredient_id] = ingredient_id
    end

    attributes
  end

  def recipe_event_id
    params.try(:recipe_event).try(:id) || params[:id]
  end
end

