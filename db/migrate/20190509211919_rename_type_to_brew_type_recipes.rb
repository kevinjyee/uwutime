class RenameTypeToBrewTypeRecipes < ActiveRecord::Migration[5.2]
  def change
    rename_column :recipes, :type, :brew_type
  end
end
