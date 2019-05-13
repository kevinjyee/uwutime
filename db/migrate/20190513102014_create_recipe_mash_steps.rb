class CreateRecipeMashSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_mash_steps do |t|
      t.string :name
      t.string :display_name
      t.string :temperature
      t.string :temperature_unit
      t.integer :duration_hours
      t.integer :step_order
      t.string :recipe_mash_task_id
      t.string :integer

      t.timestamps
    end
  end
end
