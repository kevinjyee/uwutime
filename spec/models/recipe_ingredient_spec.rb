require 'rails_helper'

RSpec.describe RecipeIngredient, type: :model do

  describe :create do
    let(:schedule_profile) { create(:schedule_profile) }
    let(:mash_task)  {create(:mash_task, {schedule_profile: schedule_profile})}
    let(:mash_step) {create(:mash_step, {mash_task: mash_task})}
    let(:recipe) {create(:recipe, {schedule_profile: schedule_profile})}

    let(:srm) {create(:srm)}
    let (:fermentable) {create(:fermentable, {srm: srm})}
    let(:ingredient) {create(:ingredient, {entity_type: fermentable.class.name, entity_id: fermentable.id})}

    context 'associate to steps' do
      before do
        schedule_profile.touch
        mash_task.touch
        mash_step.touch
        recipe.touch
      end


      it "should have ingredients associated to steps" do

        step_one = recipe.recipe_mash_tasks.first.recipe_mash_steps.first

        recipe_ingredient = FactoryBot.create(:recipe_ingredient,  {recipe: recipe,ingredient: ingredient,
                                                                    recipe_step_type: step_one.class.name,
                                                                    recipe_step_id:step_one.id})



        expect(recipe_ingredient.recipe_step).to eq(step_one)
      end
    end

    context 'creates recipe fermentables, hops, yeast, misc' do

      before do
        schedule_profile.touch
        mash_task.touch
        mash_step.touch
        recipe.touch
      end

      it "should create recipe fermentables" do
        step_one = recipe.recipe_mash_tasks.first.recipe_mash_steps.first

        FactoryBot.create(:recipe_ingredient,  {recipe: recipe,ingredient: ingredient,
                                                                     recipe_step_type: step_one.class.name,
                                                                     recipe_step_id:step_one.id})
        recipe_fermeantable = RecipeFermentable.last

        expect(recipe_fermeantable.recipe_id).to eq(recipe.id)
        expect(recipe_fermeantable.fermentable_id).to eq(fermentable.id)
      end
    end
  end
end




