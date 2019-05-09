class RemoveTypeFromMashSteps < ActiveRecord::Migration[5.2]
  def change
    remove_column :mash_steps, :type
  end
end
