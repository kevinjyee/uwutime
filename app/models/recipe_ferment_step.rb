class RecipeFermentStep < ApplicationRecord
  belongs_to :recipe_ferment_task
  has_many :recipe_ingredients, :as => :recipe_step

  def duration_hours
    if next_step
      (next_step.day - day) *24
    else
      24
    end
  end

  protected

  def next_step
    recipe_ferment_task.recipe_ferment_steps.where("day > ?", day).first
  end
end
