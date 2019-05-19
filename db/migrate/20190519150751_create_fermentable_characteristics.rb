class CreateFermentableCharacteristics < ActiveRecord::Migration[5.2]
  def change
    create_table :fermentable_characteristics do |t|
      t.integer :fermentable_id
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
