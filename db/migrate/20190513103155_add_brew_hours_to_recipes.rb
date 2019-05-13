class AddBrewHoursToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :brew_hours, :integer
  end
end
