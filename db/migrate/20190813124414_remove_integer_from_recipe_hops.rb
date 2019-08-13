class RemoveIntegerFromRecipeHops < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipe_hops, :integer
  end
end
