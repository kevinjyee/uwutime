class CreateRecipeFermentSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ferment_steps do |t|
      t.string :name
      t.string :display_name
      t.integer :temperature
      t.string :temperature_unit
      t.integer :pressure
      t.string :pressure_unit
      t.integer :day
      t.integer :recipe_ferment_task_id

      t.timestamps
    end
  end
end
