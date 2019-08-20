class AddAmountAndUnitToRecipeFermentables < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_fermentables, :amount, :decimal, :precision => 10, :scale => 2
    add_column :recipe_fermentables, :amount_unit, :string
  end
end
