class CreatePackagingTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :packaging_tasks do |t|
      t.string :name
      t.string :step
      t.integer :step_order
      t.integer :day_start

      t.timestamps
    end
  end
end
