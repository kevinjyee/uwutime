class AddVesselIdToScheduleRequest < ActiveRecord::Migration[5.2]
  def change
    add_column :schedule_requests, :vessel_id, :integer
  end
end
