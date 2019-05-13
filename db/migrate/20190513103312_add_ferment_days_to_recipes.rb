class AddFermentDaysToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :ferment_days, :integer
  end
end
