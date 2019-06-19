class FixCatagoryDisplayInIngredients < ActiveRecord::Migration[5.2]
  def change
    rename_column :ingredients, :categoryDisplay, :category_display
  end
end
