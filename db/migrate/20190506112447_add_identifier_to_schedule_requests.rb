class AddIdentifierToScheduleRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :schedule_requests, :identifier, :string
  end
end
