class AddSrmToRecipeFermentables < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_fermentables, :srm_id, :integer
    add_column :recipe_fermentables, :srm_precise, :integer
  end
end
