class Fermentable < ApplicationRecord
  belongs_to :srm, required: false
  has_many :fermentable_characteristics
end
