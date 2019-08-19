class RecipeIngredient < ApplicationRecord
  belongs_to :recipe_step, polymorphic: true, optional: true
  belongs_to :recipe
  belongs_to :ingredient
  belongs_to :entity, polymorphic: true, optional: true

  delegate :name, :category_display, :category, to: :ingredient

  after_create :create_associative_entities

  protected

  def create_associative_entities
    case ingredient.entity_type
    when 'Fermentable'
      attributes = ingredient.entity.attributes.symbolize_keys.slice(:moisture_content,
                                                                     :dry_yield,
                                                                     :potential,
                                                                     :protein,
                                                                     :requires_mashing,
                                                                     :srm_id,
                                                                     :srm_precise)

      attributes.merge!({recipe_id: recipe_id, recipe_ingredient_id: self.id, fermentable_id: ingredient.entity.id})

      recipe_fermentable = RecipeFermentable.create!(attributes)
      self.entity_type = recipe_fermentable.class.name
      self.entity_id = recipe_fermentable.id
    when 'Hop'
      attributes = ingredient.entity.attributes.symbolize_keys.slice(:alpha_acid_min,
                                                                     :alpha_acid_max,
                                                                     :beta_acid_min,
                                                                     :beta_acid_max,
                                                                     :humulene_min,
                                                                     :humulene_max,
                                                                     :caryophyllene_min,
                                                                     :caryophyllene_max,
                                                                     :cohumulone_min,
                                                                     :cohumulone_max,
                                                                     :myrcene_min,
                                                                     :myrcene_max,
                                                                     :farnesene_min,
                                                                     :farnesene_max)

      attributes.merge!({recipe_id: recipe_id, recipe_ingredient_id: self.id, hop_id: ingredient.entity.id})

    when 'Yeast'
      attributes = ingredient.entity.attributes.symbolize_keys.slice(:attenuation_min,
                                                                     :attenuation_max,
                                                                     :ferment_temp_min,
                                                                     :ferment_temp_max,
                                                                     :alcohol_tolerance_min,
                                                                     :alcohol_tolerance_max)

      attributes.merge!({recipe_id: recipe_id, recipe_ingredient_id: self.id, yeast_id: ingredient.entity.id})

    end
  end
end
