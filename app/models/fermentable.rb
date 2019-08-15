class Fermentable < ApplicationRecord
  belongs_to :srm, required: false
  has_many :fermentable_characteristics
  has_many :recipe_fermentables

  class << self
    def query(term)
      options = {
          any_match: "%#{term}%",
          prefix_match: "#{term}%",
      }

      distinct
          .where([
                     "srm_precise LIKE :prefix_match",
                     "name LIKE :any_match"
                 ].join(' OR '), options)
    end
  end

  def display_name
    if srm_precise
      "#{name} (SRM: #{srm_precise})"
    else
      "#{name}"
    end
  end
end
