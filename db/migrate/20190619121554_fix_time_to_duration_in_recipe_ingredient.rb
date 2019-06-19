class FixTimeToDurationInRecipeIngredient < ActiveRecord::Migration[5.2]
  def change
    rename_column :recipe_ingredients, :time, :duration
    rename_column :recipe_ingredients, :time_unit, :duration_unit
  end
end
