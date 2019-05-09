class MashTask < ApplicationRecord
  belongs_to :schedule_profile
  has_many :mash_steps
end
