class RecipesController < ApplicationController

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def index
    @recipe = Recipe.all
    render json: @recipe
  end

  def show
    @recipe = Recipe.find(recipe_id)
    render json: @recipe
  end

  def destroy
    recipe = Recipe.find(recipe_id)
    recipe.destroy
    render json: recipe
  end

  protected

  def recipe_params
    params.require(:recipe).permit(:name)
  end

  def recipe_id
    params.try(:recipe).try(:id) || params[:id]
  end

  def includes
    { recipe_mash_tasks: action_name == 'show',
      recipe_ferment_tasks: action_name == 'show',
      recipe_packaging_tasks: action_name == 'show',
      recipe_ingredients: action_name == 'show'
    }
  end
end
