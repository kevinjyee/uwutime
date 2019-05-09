class CreateMashTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :mash_tasks do |t|
      t.string :name
      t.string :step
      t.integer :step_order

      t.timestamps
    end
  end
end
