class CreateOrganizationTaskTemplateAssociations < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_task_template_associations do |t|
      t.integer :organization_id
      t.integer :task_template_id

      t.timestamps
    end
  end
end
