class RecipePackagingStep < ApplicationRecord
  belongs_to :recipe_packaging_task

  def duration_hours
    if next_step
      (next_step.day - day + 1) *24
    else
      24
    end
  end

  protected

  def next_step
    recipe_packaging_task.recipe_packaging_steps.where("day > ?", day).first
  end
end
