class AddEntityToIngredients < ActiveRecord::Migration[5.2]
  def change
    add_column :ingredients, :entity_type, :string
    add_column :ingredients, :entity_id, :integer
  end
end
