class RecipeEvent < ApplicationRecord

  self.table_name = 'recipes'

  def events
    @_events ||= BuildScheduleTemplate.call({recipe: recipe}).result
  end

  def steps
    @_steps ||= recipe_mash_tasks.map{ |step| step.recipe_mash_steps} +
        recipe_ferment_tasks.map{ |step| step.recipe_ferment_steps} +
        recipe_packaging_tasks.map{ |step| step.recipe_packaging_steps}.flatten!
  end

  def recipe
    @recipe ||= Recipe.find(self.id)
  end

  def recipe_mash_tasks
    @recipe_mash_tasks ||= RecipeMashTask.where({recipe: self.id})
  end

  def recipe_ferment_tasks
    @recipe_ferment_tasks ||= RecipeFermentTask.where({recipe: self.id})
  end

  def recipe_packaging_tasks
    @recipe_packaging_tasks ||= RecipePackagingTask.where({recipe: self.id})
  end
end