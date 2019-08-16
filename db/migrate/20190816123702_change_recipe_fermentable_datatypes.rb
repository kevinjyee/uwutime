class ChangeRecipeFermentableDatatypes < ActiveRecord::Migration[5.2]
  def change
  	change_column :recipe_fermentables, :dry_yield, :decimal, :precision => 10, :scale => 2
    change_column :recipe_fermentables, :protein, :decimal, :precision => 10, :scale => 2
    change_column :recipe_fermentables, :potential, :decimal, :precision => 10, :scale => 2 
  end
end
