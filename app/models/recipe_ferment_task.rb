class RecipeFermentTask < ApplicationRecord
  belongs_to :recipe
  has_many :recipe_ferment_steps, dependent: :destroy

  accepts_nested_attributes_for :recipe_ferment_steps, allow_destroy: true
  def total_days
    recipe_ferment_steps.last.day-day_start+1
  end

  def total_hours
    total_days*24
  end
end
