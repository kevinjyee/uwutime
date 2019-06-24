class RecipeFermentable < ApplicationRecord
  belongs_to :recipe
  belongs_to :fermentable
end
