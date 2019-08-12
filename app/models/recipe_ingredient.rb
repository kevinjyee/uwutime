class RecipeIngredient < ApplicationRecord
  belongs_to :recipe_step, polymorphic: true, optional: true
  belongs_to :recipe
  belongs_to :ingredient

  delegate :name, :category_display, :category, :srm, :srm_precise, to: :ingredient
end
