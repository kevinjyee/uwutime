class ScheduleProfileSerializer <  BaseSerializer

  attributes :id, :name, :brew_hours, :ferment_days, :packaging_days

  has_many :mash_tasks, embed: :ids, if: :include_mash_tasks?
  has_many :ferment_tasks, embed: :ids, if: :include_ferment_tasks?
  has_many :packaging_tasks, embed: :ids, if: :include_packaging_tasks?

  def include_mash_tasks?
    includes[:mash_tasks]
  end

  def include_ferment_tasks?
    includes[:ferment_tasks]
  end

  def include_packaging_tasks?
    includes[:packaging_tasks]
  end
end