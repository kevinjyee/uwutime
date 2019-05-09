class AddPackagingTaskIdToPackagingSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :packaging_steps, :packaging_task_id, :integer
  end
end
