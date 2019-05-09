class FermentTask < ApplicationRecord
  belongs_to :schedule_profile
  has_many :ferment_steps
end
