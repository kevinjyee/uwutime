class ChangeTypeinVessels < ActiveRecord::Migration[5.2]
  def change
    rename_column :vessels, :type, :vessel_type
  end
end
