class CreateVessels < ActiveRecord::Migration[5.2]
  def change
    create_table :vessels do |t|
      t.integer :organization_id
      t.string :identifier
      t.integer :volume
      t.string :volume_unit
      t.string :type

      t.timestamps
    end
  end
end
