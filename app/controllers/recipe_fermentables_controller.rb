class RecipeFermentablesController < ApplicationController
  def create
    unless fermentable_name
      render json: {message: 'Missing fermentable name'}, status: :unprocessable_entity
    end

    fermentable = Fermentable.where({name: fermentable_name}).first

    unless fermentable
      render json: {message: "Couldn't find ingredient with name #{fermentable_name}"}, status: :unprocessable_entity
    end

    recipe_fermentable = RecipeFermentable.new(recipe_fermentable_params)
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
    byebug
    @recipe_fermentables = RecipeFermentable.where({recipe_id: recipe_id})
    byebug
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

  def recipe_fermentable_id
    params.try(:recipe_fermentable).try(:id) || params[:id]
  end

  def fermentable_name
    params.try(:name)
  end

  def recipe_id
    params[:recipe_id]
  end
end

