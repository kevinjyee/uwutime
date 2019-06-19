require 'rails_helper'

RSpec.describe Recipe, type: :model do
  let (:schedule_profile) {create(:schedule_profile)}
  let(:mash_task)  {create(:mash_task, {schedule_profile: schedule_profile})}
  let(:mash_step) {create(:mash_step, {mash_task: mash_task})}


  describe :copy_schedule_profiles do
    before do
      schedule_profile.touch
      mash_task.touch
      mash_step.touch
    end

    it 'should create mash templates' do
      recipe = FactoryBot.create(:recipe, {schedule_profile: schedule_profile})
      expect(recipe.recipe_mash_tasks.size).to eq 1
      expect(recipe.recipe_mash_tasks.first.recipe_mash_steps.size).to eq 1
    end
  end
end
