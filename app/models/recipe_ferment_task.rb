class RecipeFermentTask < ApplicationRecord
  belongs_to :recipe
  has_many :recipe_ferment_steps
end
