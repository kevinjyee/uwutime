class CreateMiscs < ActiveRecord::Migration[5.2]
  def change
    create_table :miscs do |t|
      t.string :name

      t.timestamps
    end
  end
end
