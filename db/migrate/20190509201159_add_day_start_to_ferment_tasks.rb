class AddDayStartToFermentTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :ferment_tasks, :day_start, :integer
  end
end
