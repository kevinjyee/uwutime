class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :type
      t.integer :schedule_profile_id

      t.timestamps
    end
  end
end
