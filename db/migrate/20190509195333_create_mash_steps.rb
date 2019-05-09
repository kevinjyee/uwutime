class CreateMashSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :mash_steps do |t|
      t.string :name
      t.string :type
      t.string :display_name
      t.integer :temperature
      t.string :temperature_unit
      t.integer :duration_hours
      t.integer :step_order

      t.timestamps
    end
  end
end
