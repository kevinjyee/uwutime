class ChangeFermentableDatatypes < ActiveRecord::Migration[5.2]
  def change
    change_column :fermentables, :dry_yield, :decimal, :precision => 10, :scale => 2
    change_column :fermentables, :protein, :decimal, :precision => 10, :scale => 2
    change_column :fermentables, :potential, :decimal, :precision => 10, :scale => 2 
  end
end
