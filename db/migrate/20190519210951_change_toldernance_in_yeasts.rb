class ChangeToldernanceInYeasts < ActiveRecord::Migration[5.2]
  def change
    rename_column :yeasts, :alcohol_toldernance_min, :alcohol_tolernance_min
  end
end
