class CreateTaskTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :task_templates do |t|
      t.integer :organization_id
      t.string :task_type
      t.text :template

      t.timestamps
    end
  end
end
