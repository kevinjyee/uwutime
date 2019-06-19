class CreateFermentables < ActiveRecord::Migration[5.2]
  def change
    create_table :fermentables do |t|
      t.string :name
      t.text :description
      t.string :country_of_origin
      t.integer :srm_id
      t.integer :srm_precise
      t.integer :moisture_content
      t.decimal :dry_yield
      t.decimal :potential
      t.integer :protein
      t.string :max_in_batch
      t.string :requires_mashing
      t.string :category
      t.string :category_display
      t.timestamps
    end
  end
end
