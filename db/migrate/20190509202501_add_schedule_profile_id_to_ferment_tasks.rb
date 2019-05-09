class AddScheduleProfileIdToFermentTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :ferment_tasks, :schedule_profile_id, :integer
  end
end
