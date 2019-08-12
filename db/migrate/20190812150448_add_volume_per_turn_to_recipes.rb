class AddVolumePerTurnToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :volume_per_turn, :decimal, precision: 10, scale: 2
add_column :recipes, :volume_per_turn_unit, :string
  end
end
