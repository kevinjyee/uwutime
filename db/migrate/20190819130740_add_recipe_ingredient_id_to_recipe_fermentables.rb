class AddRecipeIngredientIdToRecipeFermentables < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_fermentables, :recipe_ingredient_id, :integer
  end
end
