class AddFermentTaskIdToFermentSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :ferment_steps, :ferment_task_id, :integer
  end
end
