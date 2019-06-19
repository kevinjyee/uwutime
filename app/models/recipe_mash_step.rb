class RecipeMashStep < ApplicationRecord
  belongs_to :recipe_mash_task
  has_many :recipe_ingredients, :as => :recipe_step
end
