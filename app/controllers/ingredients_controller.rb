class IngredientsController < ApplicationController

  def index
    @ingredients = ingredients
    render json: @ingredients
  end

  def ingredients
    Ingredient.where({category: category})
  end

  def category
    params[:category]
  end
end
