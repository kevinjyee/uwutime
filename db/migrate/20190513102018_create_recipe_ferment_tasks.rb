class CreateRecipeFermentTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ferment_tasks do |t|
      t.string :name
      t.string :step
      t.integer :step_order
      t.integer :day_start
      t.integer :recipe_id

      t.timestamps
    end
  end
end
