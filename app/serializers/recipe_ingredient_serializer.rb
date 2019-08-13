class RecipeIngredientSerializer < BaseSerializer

  attributes :id, :name, :category_display, :amount, :amount_unit, :recipe_step, :category, :srm, :srm_precise, :entity

  has_one :entity, embed: :object

end
