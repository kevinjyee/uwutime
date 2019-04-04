class CreateScheduleRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :schedule_requests do |t|
      t.integer :owner_id
      t.string :product_name
      t.integer :run_quantity
      t.date :requested_preferred_date
      t.text :notes
      t.string :status
      t.datetime :scheduled_run_start
      t.datetime :scheduled_run_end
      t.text :scheduled_tasks
      t.boolean :scheduled

      t.timestamps
    end
  end
end
