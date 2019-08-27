class RecipeEventSerializer <  BaseSerializer
  attributes :events, :recipe_mash_tasks, :recipe_ferment_tasks, :recipe_packaging_tasks

  def recipe_mash_tasks
    ActiveModel::SerializableResource.new(object.recipe_mash_tasks, each_serializer: RecipeMashTaskSerializer).as_json
  end

  def recipe_ferment_tasks
    ActiveModel::SerializableResource.new(object.recipe_ferment_tasks, each_serializer: RecipeFermentTaskSerializer).as_json
  end

  def recipe_packaging_tasks
    ActiveModel::SerializableResource.new(object.recipe_packaging_tasks, each_serializer: RecipePackagingTaskSerializer).as_json
  end
end