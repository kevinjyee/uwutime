class ScheduleProfile < ApplicationRecord
  has_many :mash_tasks
  has_many :ferment_tasks
  has_many :packing_tasks
  has_many :recipes

  def tempalte

  end
end


