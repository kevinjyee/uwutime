class CreateFermentSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :ferment_steps do |t|
      t.string :name
      t.string :display_name
      t.integer :temperature
      t.string :temperature_unit
      t.integer :pressure
      t.string :pressure_unit
      t.integer :day

      t.timestamps
    end
  end
end
