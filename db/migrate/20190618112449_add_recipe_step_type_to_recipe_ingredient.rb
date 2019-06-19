class AddRecipeStepTypeToRecipeIngredient < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_ingredients, :recipe_step_type, :string
    add_column :recipe_ingredients, :recipe_step_id, :integer
  end
end
