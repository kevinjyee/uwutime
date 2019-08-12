class RecipeSerializer <  BaseSerializer

  attributes :id, :name, :brew_type, :brew_hours, :ferment_days, :packaging_days, :events, :volume_per_turn, :volume_per_turn_unit

  has_many :recipe_mash_tasks, embed: :ids, if: :include_recipe_mash_tasks?
  has_many :recipe_ferment_tasks, embed: :ids, if: :include_recipe_ferment_tasks?
  has_many :recipe_packaging_tasks, embed: :ids, if: :include_recipe_packaging_tasks?
  has_many :recipe_ingredients, embed: :ids, if: :include_recipe_ingredients?

  def include_recipe_mash_tasks?
    includes[:recipe_mash_tasks]
  end

  def include_recipe_ferment_tasks?
    includes[:recipe_ferment_tasks]
  end

  def include_recipe_packaging_tasks?
    includes[:recipe_packaging_tasks]
  end

  def include_recipe_ingredients?
    includes[:recipe_ingredients]
  end

  def events
    object.events if includes[:recipe_events]
  end
end