class AddEndTypeToScheduleRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :schedule_requests, :end_type, :string
  end
end
