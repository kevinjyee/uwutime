class CreateHops < ActiveRecord::Migration[5.2]
  def change
    create_table :hops do |t|
      t.string :name
      t.text :description
      t.string :country_of_origin
      t.decimal :alpha_acid_min
      t.decimal :alpha_acid_max
      t.decimal :beta_acid_min
      t.decimal :beta_acid_max
      t.decimal :humulene_min
      t.decimal :humulene_max
      t.decimal :caryophyllene_min
      t.decimal :caryophyllene_max
      t.decimal :cohumulone_min
      t.decimal :cohumulone_max
      t.decimal :myrcene_min
      t.decimal :myrcene_max
      t.decimal :farnesene_min
      t.decimal :farnesene_max
      t.string :is_noble
      t.string :for_bittering
      t.string :for_flavor
      t.string :for_aroma
      t.string :category
      t.string :category_display

      t.timestamps
    end
  end
end
