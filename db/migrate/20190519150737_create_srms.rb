class CreateSrms < ActiveRecord::Migration[5.2]
  def change
    create_table :srms do |t|
      t.string :name
      t.string :hex

      t.timestamps
    end
  end
end
