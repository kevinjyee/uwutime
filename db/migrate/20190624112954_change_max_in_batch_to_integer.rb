class ChangeMaxInBatchToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :fermentables, :max_in_batch, :integer
  end
end
