class Recipe < ApplicationRecord
  belongs_to :schedule_profile
  before_create :copy_schedule_profile


  protected

  def copy_schedule_profile

  end
end
