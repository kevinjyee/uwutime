class RecipeFermentable < ApplicationRecord
  belongs_to :recipe
  belongs_to :fermentable
  belongs_to :recipe_ingredient

  delegate :name, to: :fermentable
  delegate :amount, :amount_unit, to: :recipe_ingredient
end
