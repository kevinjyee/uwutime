class AddMashTaskIdToMashSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :mash_steps, :mash_task_id, :integer
  end
end
