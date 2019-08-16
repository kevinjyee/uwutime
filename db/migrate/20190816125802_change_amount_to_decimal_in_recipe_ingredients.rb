class ChangeAmountToDecimalInRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
  	change_column :recipe_ingredients, :amount, :decimal, :precision => 10, :scale => 2
  end
end
