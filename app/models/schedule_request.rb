class ScheduleRequest < ApplicationRecord
  # belongs_to :owner, class_name: 'User'
  # belongs_to :schedule_request_template
  #

  NOT_SCHEDULED = 'not_scheduled'
  SCHEDULED = 'scheduled'
  IN_PROGRESS = 'in_progress'
  COMPLETE = 'complete'

  HOURS = 'hours'
  DAYS = 'days'

  serialize :scheduled_tasks, JSON

 OPTIONS = [
      NOT_SCHEDULED,
      SCHEDULED,
      IN_PROGRESS,
      COMPLETE
  ].freeze

  scope :unscheduled, -> { with_status(NOT_SCHEDULED) }
  scope :scheduled, -> { with_status(SCHEDULED) }

  COLOR_PICKER = {
      'brew' => {
      hours: 24.0,
      backgroundColor: '#17E9E0',
      color: '#fff',
      background: '#17E9E0',
      border: '#adc6ff',
      borderStyle: 'solid',
      borderRadius: '10px',

  },
      'ferment' => {
      hours: 120.0,
      color: '#fff',
      background: '#ffb48f',
      backgroundColor:'#ffb48f',
      border: '#b7eb8f',
      borderStyle: 'solid',
      borderRadius:'10px'
  },
      'package' => {
      hours: 24.0,
      backgroundColor:'#fccd04',
      color: '#fff',
      background: '#fccd04',
      border: '#ffe58f',
      borderStyle: 'solid',
      borderRadius:'10px'
  }
  }

  class<<self
    def with_status(status)
      where({status: status })
    end
  end

  def total_hours
    hours = 0
    scheduled_tasks.each do |_key, task|
      amount =  task['time_interval'] == 'hours' ? task['time'] : task['time'] * 24
      hours += amount
    end
    hours.to_f
  end

  def children
    # hardcode background, border, color, borderStyle, borderRadius for now
    attributes = {}
    self.scheduled_tasks.each do |key, value|
      attributes[key] = create_task_templates(key, value)
    end
    attributes
  end

  def maxChild
    maxChild = self.scheduled_tasks.keys[0]
    maxHours = -1
    self.children.each do |key, value|
      if value[:hours] > maxHours
        maxHours = value[:hours]
        maxChild = key
      end
    end
    maxChild
  end

  def totalHours
    totalHours = 0
    self.children.each do |key, value|
      totalHours += value[:hours]
    end
    totalHours
  end

  def start
    scheduled_run_start.nil? ? "" : scheduled_run_start
  end

  def end
    scheduled_run_start.nil? ? "" : scheduled_run_start
  end

  def resourceId
    vessel_id.nil? ? "" : vessel_id
  end

  def title
    "#{product_name}-#{id}"
  end


  protected

  def create_task_templates(key, value)
    value = value.symbolize_keys
    hours = value[:time]
    if value[:time_interval] == DAYS
      hours = hours*24
    end
    {
        hours: hours.to_f,
        start: '',
        end: '',
        backgroundColor: COLOR_PICKER[key][:backgroundColor],
        color: COLOR_PICKER[key][:color],
        background: COLOR_PICKER[key][:background],
        border: COLOR_PICKER[key][:borderStyle],
        borderRadius: COLOR_PICKER[key][:borderRadius]
    }
  end
end