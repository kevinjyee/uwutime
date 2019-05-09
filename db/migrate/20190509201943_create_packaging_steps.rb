class CreatePackagingSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :packaging_steps do |t|
      t.string :name
      t.string :display_name
      t.integer :day

      t.timestamps
    end
  end
end
