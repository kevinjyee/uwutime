# generate the ingredients from existing ones


Fermentable.all.each do |fermentable|
  Ingredient.create!({
      name: fermentable.name,
      category: 'fermentable',
      category_display: 'Malts, Grains & Fermentables',
      entity_type: 'Fermentable',
      entity_id: fermentable.id
                     })
end


Hop.all.each do |hop|
  Ingredient.create!({
      name: hop.name,
      category: 'hop',
      category_display: 'Hops',
      entity_type: 'Hop',
      entity_id: hop.id
                     })
end


Yeast.all.each do |yeast|
  Ingredient.create!({
      name: yeast.name,
      category: 'hop',
      category_display: 'Yeast',
      entity_type: 'Yeast',
      entity_id: yeast.id
                     })
end

Ingredient.all.each do |ingredient|
  ingredient.destroy
end