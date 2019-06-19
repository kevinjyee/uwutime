class RecipeIngredient < ApplicationRecord
  belongs_to :recipe_step, polymorphic: true
  belongs_to :recipe
  belongs_to :ingredient
end
