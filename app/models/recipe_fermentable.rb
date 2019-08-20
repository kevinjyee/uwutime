class RecipeFermentable < ApplicationRecord
  belongs_to :recipe
  belongs_to :fermentable
  belongs_to :recipe_ingredient
  delegate :name, to: :fermentable

  delegate :amount, :amount_unit, to: :recipe_ingredient

  accepts_nested_attributes_for :recipe_ingredient

  after_create :set_recipe_ingredient_attributes

  protected

  def set_recipe_ingredient_attributes
    recipe_ingredient.update_columns(entity_type:self.class.name,
                                     entity_id: self.id)
  end
end
