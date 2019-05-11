class ScheduleProfile < ApplicationRecord
  has_many :mash_tasks
  has_many :ferment_tasks
  has_many :packaging_tasks
  has_many :recipes

  def brew_hours
    num_hours = 0
    tasks = mash_tasks.order("step_order ASC")
    tasks.each do |task|
      task.mash_steps.order("step_order ASC").each do|step|
        num_hours += step.duration_hours
      end
    end
    num_hours
  end

  def ferment_days
    tasks = ferment_tasks.order("step_order ASC")
    first_day = tasks.first.ferment_steps.order("day ASC").first.day
    last_day = tasks.last.ferment_steps.order("day ASC").last.day
    last_day-first_day+1
  end

  def packaging_days
    tasks = packaging_tasks.order("step_order ASC")
    first_day = tasks.first.packaging_steps.order("day ASC").first.day
    last_day = tasks.last.packaging_steps.order("day ASC").last.day
    last_day-first_day+1
  end

  def template

  end
end


