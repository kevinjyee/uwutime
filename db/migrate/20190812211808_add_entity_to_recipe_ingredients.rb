class AddEntityToRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_ingredients, :entity, :string
    add_column :recipe_ingredients, :entity_id, :integer
  end
end
