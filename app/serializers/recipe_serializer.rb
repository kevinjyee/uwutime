class RecipeSerializer <  BaseSerializer

  attributes :id, :name, :brew_type, :brew_hours, :ferment_days, :packaging_days

  has_many :recipe_mash_tasks, embed: :ids, if: :include_recipe_mash_tasks?
  has_many :recipe_ferment_tasks, embed: :ids, if: :include_recipe_ferment_tasks?
  has_many :recipe_packaging_tasks, embed: :ids, if: :include_recipe_packaging_tasks?

  def include_recipe_mash_tasks?
    includes[:recipe_mash_tasks]
  end

  def include_recipe_ferment_tasks?
    includes[:recipe_ferment_tasks]
  end

  def include_recipe_packaging_tasks?
    includes[:recipe_packaging_tasks]
  end
end