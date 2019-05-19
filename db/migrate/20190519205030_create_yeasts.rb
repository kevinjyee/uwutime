class CreateYeasts < ActiveRecord::Migration[5.2]
  def change
    create_table :yeasts do |t|
      t.string :name
      t.text :description
      t.decimal :attenuation_min
      t.decimal :attenuation_max
      t.decimal :ferment_temp_min
      t.decimal :ferment_temp_max
      t.decimal :alcohol_toldernance_min
      t.decimal :alcohol_tolerance_max
      t.string :supplier
      t.string :yeast_format
      t.string :category
      t.string :category_display

      t.timestamps
    end
  end
end
