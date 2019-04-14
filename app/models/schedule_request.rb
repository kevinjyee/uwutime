class ScheduleRequest < ApplicationRecord
  # belongs_to :owner, class_name: 'User'
  # belongs_to :schedule_request_template
  #

  NOT_SCHEDULED = 'not_scheduled'
  SCHEDULED = 'scheduled'
  IN_PROGRESS = 'in_progress'
  COMPLETE = 'complete'

 OPTIONS = [
      NOT_SCHEDULED,
      SCHEDULED,
      IN_PROGRESS,
      COMPLETE
  ].freeze

  scope :unscheduled, -> { with_status(NOT_SCHEDULED) }
  scope :scheduled, -> { with_status(SCHEDULED) }

  class<<self
    def with_status(status)
      where({status: status })
    end
  end
end