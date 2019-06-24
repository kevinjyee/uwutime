class Recipe < ApplicationRecord
  belongs_to :schedule_profile
  has_many :recipe_mash_tasks
  has_many :recipe_ferment_tasks
  has_many :recipe_packaging_tasks

  has_many :recipe_ingredients
  has_many :recipe_fermentables
  has_many :recipe_hops
  has_many :recipe_yeasts


  after_create :copy_schedule_profile


  protected

  def copy_schedule_profile
    calculate_brew_templates
    calculate_ferment_templates
    calculate_packaging_templates
  end

  def calculate_brew_templates
    schedule_profile.mash_tasks.each do |mash_task|
      recipe_mash_task = RecipeMashTask.create!({recipe: self,
                              name: mash_task.name,
                              step: mash_task.step,
                              step_order: mash_task.step_order
                             })
      mash_task.mash_steps.each do |mash_step|
        RecipeMashStep.create!({name: mash_step.name,
                                display_name: mash_step.display_name,
                                temperature: mash_step.temperature,
                                temperature_unit: mash_step.temperature_unit,
                                duration_hours: mash_step.duration_hours,
                                step_order: mash_step.step_order,
                                recipe_mash_task: recipe_mash_task
                               })
      end
    end
  end

  def calculate_ferment_templates
    schedule_profile.ferment_tasks.each do |ferment_task|
      recipe_ferment_task = RecipeFermentTask.create!({recipe: self,
                                                 name: ferment_task.name,
                                                 step: ferment_task.step,
                                                 step_order: ferment_task.step_order,
                                                       day_start: ferment_task.day_start

                                                })
      ferment_task.ferment_steps.each do |ferment_step|
        RecipeFermentStep.create!({
                                name: ferment_step.name,
                                display_name: ferment_step.display_name,
                                temperature: ferment_step.temperature,
                                temperature_unit: ferment_step.temperature_unit,
                                pressure: ferment_step.pressure,
                                pressure_unit: ferment_step.pressure_unit,
                                day: ferment_step.day,
                                recipe_ferment_task: recipe_ferment_task
                               })
      end
    end
  end

  def calculate_packaging_templates
    schedule_profile.packaging_tasks.each do |packaging_task|
      recipe_packaging_task = RecipePackagingTask.create!({recipe: self,
                                                       name: packaging_task.name,
                                                       step: packaging_task.step,
                                                       step_order: packaging_task.step_order,
                                                       day_start: packaging_task.day_start

                                                      })
      packaging_task.packaging_steps.each do |packaging_step|
        RecipePackagingStep.create!({
                                name: packaging_step.name,
                                display_name: packaging_step.display_name,
                                day: packaging_step.day,
                                recipe_packaging_task: recipe_packaging_task
                               })
      end
    end
  end
end
