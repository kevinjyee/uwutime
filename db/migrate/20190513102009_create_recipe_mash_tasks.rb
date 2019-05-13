class CreateRecipeMashTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_mash_tasks do |t|
      t.integer :recipe_id
      t.integer :mash_task_id
      t.string :name
      t.string :step
      t.integer :step_order

      t.timestamps
    end
  end
end
