class RecipeMashTask < ApplicationRecord
  belongs_to :recipe
  has_many :recipe_mash_steps, dependent: :destroy

  accepts_nested_attributes_for :recipe_mash_steps, allow_destroy: true

  def total_hours
    recipe_mash_steps.map{|step| step.duration_hours}.inject(:+)
  end
end
