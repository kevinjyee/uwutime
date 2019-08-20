class RecipeIngredient < ApplicationRecord
  belongs_to :recipe_step, polymorphic: true, optional: true
  belongs_to :recipe
  belongs_to :ingredient, optional: true # remove after testing
  belongs_to :entity, polymorphic: true, optional: true

  delegate :name, :category_display, :category, to: :ingredient

  before_validation :set_defaults

  protected

  def set_defaults
    unless self.ingredient_id

    end
  end
end
