class AddScheduleProfileIdToMashTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :mash_tasks, :schedule_profile_id, :integer
  end
end
