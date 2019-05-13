class RecipePackagingTask < ApplicationRecord
  has_many :recipe_packaging_steps
  belongs_to :recipe
end
