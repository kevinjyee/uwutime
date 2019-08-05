class RecipePackagingTask < ApplicationRecord
  has_many :recipe_packaging_steps
  belongs_to :recipe

  def total_days
    recipe_packaging_steps.last.day-day_start+1
  end

  def total_hours
    total_days*24
  end
end
