class RemoveIntegerFromRecipeMashSteps < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipe_mash_steps, :integer
  end
  end
