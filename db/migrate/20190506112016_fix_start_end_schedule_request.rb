class FixStartEndScheduleRequest < ActiveRecord::Migration[5.2]
  def change
    rename_column :schedule_requests, :scheduled_run_start, :start
    rename_column :schedule_requests, :scheduled_run_end, :end
  end
end
