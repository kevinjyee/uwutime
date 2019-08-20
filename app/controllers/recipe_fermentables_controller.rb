class RecipeFermentablesController < ApplicationController
  def create
    recipe_fermentable = RecipeFermentable.new(new_recipe_fermentable_params)
    if recipe_fermentable.save
      render json: recipe_fermentable
    else
      render json: recipe_fermentable.errors, status: :unprocessable_entity
    end
  end

  def show
    @recipe_fermentable = RecipeFermentable.find(schedule_profile_id)
    render json: @recipe_fermentable
  end

  def index
    @recipe_fermentables = RecipeFermentable.where({recipe_id: recipe_id})
    render json: @recipe_fermentables
  end

  def destroy
    recipe_fermentable = RecipeFermentable.find(recipe_fermentable_id)
    recipe_fermentable.destroy
    render json: recipe_fermentable
  end

  protected

  def recipe_fermentable_params
    params.require(:recipe_fermentable).permit(:recipe_id,
                                               :name,
                                               :volume,
                                               :volume_unit,
                                               :srm_precise
    )
  end

  def new_recipe_fermentable_params
    attributes = (params[:recipe_fermentable] || ActionController::Parameters.new({})).permit(
        :recipe_id,
        :fermentable_id,
        :srm_precise,
        recipe_ingredient: [:id,
                            :recipe_id,
                            :amount,
                            :amount_unit,
                            :recipe_step_type,
                            :recipe_step_id
        ])

    if (attributes[:recipe_ingredient])
      attributes.merge!({ recipe_ingredient_attributes: attributes.delete(:recipe_ingredient) })

      attributes[:recipe_ingredient_attributes][:ingredient_id] = ingredient_id
    end

    attributes
  end

  def recipe_fermentable_id
    params.try(:recipe_fermentable).try(:id) || params[:id]
  end

  def fermentable_name
    params.try(:name)
  end

  def recipe_id
    params[:recipe_id]
  end

  def ingredient_id
    if fermentable_id = params[:recipe_fermentable][:fermentable_id]
      ingredient = Ingredient.where({entity_type: 'Fermentable', entity_id: fermentable_id}).first
      return ingredient.id unless ingredient.nil?
    end
  end
end

