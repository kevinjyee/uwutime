class Ingredient < ApplicationRecord
  belongs_to :entity, polymorphic: true
  has_many :recipe_ingredient
end

