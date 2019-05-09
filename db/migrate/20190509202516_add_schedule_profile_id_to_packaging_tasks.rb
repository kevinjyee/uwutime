class AddScheduleProfileIdToPackagingTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :packaging_tasks, :schedule_profile_id, :integer
  end
end
