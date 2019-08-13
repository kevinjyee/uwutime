recipe_ingredients = RecipeIngredient.where({recipe_id: 5})

recipe_ingredients.each do |recipe_ingredient|
  case recipe_ingredient.ingredient.entity_type
  when 'Fermentable'
    attributes = recipe_ingredient.ingredient.entity.attributes.symbolize_keys.slice(:moisture_content,
                                                                                     :dry_yield,
                                                                                     :potential,
                                                                                     :protein,
                                                                                     :requires_mashing,
                                                                                     :srm_id,
                                                                                     :srm_precise)

    attributes.merge!({recipe_id: recipe_ingredient.recipe_id, fermentable_id: recipe_ingredient.ingredient.entity.id})

    recipe_fermentable = RecipeFermentable.create!(attributes)
    recipe_ingredient.entity_type = recipe_fermentable.class.name
    recipe_ingredient.entity_id = recipe_fermentable.id
  when 'Hop'
    attributes = recipe_ingredient.ingredient.entity.attributes.symbolize_keys.slice(:alpha_acid_min,
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

    attributes.merge!({recipe_id: recipe_ingredient.recipe_id, hop_id: recipe_ingredient.ingredient.entity.id})
    recipe_hop = RecipeHop.create!(attributes)
    recipe_ingredient.entity_type = recipe_hop.class.name
    recipe_ingredient.entity_id = recipe_hop.id

  when 'Yeast'
    attributes = recipe_ingredient.ingredient.entity.attributes.symbolize_keys.slice(:attenuation_min,
                                                                                     :attenuation_max,
                                                                                     :ferment_temp_min,
                                                                                     :ferment_temp_max,
                                                                                     :alcohol_tolerance_min,
                                                                                     :alcohol_tolerance_max)

    attributes.merge!({recipe_id: recipe_ingredient.recipe_id, yeast_id: recipe_ingredient.ingredient.entity.id})
    RecipeYeast.create!(attributes)

    recipe_yeast = RecipeYeast.find(1)
    recipe_ingredient.entity_type = recipe_yeast.class.name
    recipe_ingredient.entity_id = recipe_yeast.id
  end
end