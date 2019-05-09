class CreateFermentTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :ferment_tasks do |t|
      t.string :name
      t.string :step
      t.integer :step_order

      t.timestamps
    end
  end
end
