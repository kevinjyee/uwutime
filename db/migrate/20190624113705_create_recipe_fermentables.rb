class CreateRecipeFermentables < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_fermentables do |t|
      t.integer :recipe_id
      t.integer :fermentable_id
      t.integer :moisture_content
      t.decimal :dry_yield
      t.decimal :potential
      t.integer :protein
      t.string :requires_mashing

      t.timestamps
    end
  end
end
