class ChangeTolernanceInYeasts < ActiveRecord::Migration[5.2]
  def change
    rename_column :yeasts, :alcohol_tolernance_min, :alcohol_tolerance_min
  end
end
