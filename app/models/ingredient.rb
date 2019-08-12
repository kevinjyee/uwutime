class Ingredient < ApplicationRecord
  belongs_to :entity, polymorphic: true
  has_many :recipe_ingredient

  def srm
    entity.try(:srm_id)
  end

  def srm_precise
    entity.try(:srm_precise)
  end
end

