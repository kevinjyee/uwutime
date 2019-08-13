class RenameEntityToEntityTypeInRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    rename_column :recipe_ingredients, :entity, :entity_type
  end
end
