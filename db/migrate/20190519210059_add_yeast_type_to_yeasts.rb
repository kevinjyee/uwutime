class AddYeastTypeToYeasts < ActiveRecord::Migration[5.2]
  def change
    add_column :yeasts, :yeast_type, :string
  end
end
