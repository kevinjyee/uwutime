class PackagingTask < ApplicationRecord
  belongs_to :schedule_profile
  has_many :packaging_steps
end
