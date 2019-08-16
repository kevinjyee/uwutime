class Fermentable < ApplicationRecord
  belongs_to :srm, required: false
  has_many :fermentable_characteristics
  has_many :recipe_fermentables

  class << self
    def query(term, search_by_prefix)

      options = {
          any_match: "%#{term}%",
          prefix_match: "#{term}%",
      }

      if search_by_prefix
        distinct
            .where([
                       "name LIKE :prefix_match",
                   ].join(' OR '), options)
      else
        distinct
            .where([
                       "srm_precise LIKE :prefix_match",
                       "name LIKE :any_match"
                   ].join(' OR '), options)
      end
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
