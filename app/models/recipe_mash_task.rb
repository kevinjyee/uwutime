class RecipeMashTask < ApplicationRecord
  belongs_to :recipe
  has_many :recipe_mash_steps
end
