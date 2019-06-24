class CreateRecipeHops < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_hops do |t|
      t.integer :recipe_id
      t.string :hop_id
      t.string :integer
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

      t.timestamps
    end
  end
end
