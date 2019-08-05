class RecipeMashTask < ApplicationRecord
  belongs_to :recipe
  has_many :recipe_mash_steps

  def total_hours
    recipe_mash_steps.map{|step| step.duration_hours}.inject(:+)
  end
end
