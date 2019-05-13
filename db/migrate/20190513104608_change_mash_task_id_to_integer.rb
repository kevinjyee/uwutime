class ChangeMashTaskIdToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :recipe_mash_steps, :recipe_mash_task_id, :integer
  end
end
