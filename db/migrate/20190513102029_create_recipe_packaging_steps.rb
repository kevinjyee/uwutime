class CreateRecipePackagingSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_packaging_steps do |t|
      t.string :name
      t.string :display_name
      t.integer :day
      t.integer :recipe_packaging_task_id

      t.timestamps
    end
  end
end
