class AddPackagingDaysToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :packaging_days, :integer
  end
end
