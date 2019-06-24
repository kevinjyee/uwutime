class CreateRecipeYeasts < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_yeasts do |t|
      t.integer :recipe_id
      t.integer :yeast_id
      t.decimal :attenuation_min
      t.decimal :attenuation_max
      t.decimal :ferment_temp_min
      t.decimal :ferment_temp_max
      t.decimal :alcohol_tolerance_min
      t.decimal :alcohol_tolerance_max

      t.timestamps
    end
  end
end
