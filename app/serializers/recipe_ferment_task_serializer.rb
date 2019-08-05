class RecipeFermentTaskSerializer < BaseSerializer

  attributes :id, :name, :step, :step_order, :day_start, :recipe_ferment_steps, :total_hours

end
