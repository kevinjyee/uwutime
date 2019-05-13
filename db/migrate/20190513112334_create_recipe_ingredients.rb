class CreateRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ingredients do |t|
      t.integer :recipe_id
      t.integer :ingredient_id
      t.integer :amount
      t.string :amount_unit
      t.integer :time
      t.string :time_unit

      t.timestamps
    end
  end
end
