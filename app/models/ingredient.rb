class Ingredient < ApplicationRecord
  belongs_to :entity, polymorphic: true
end

