class PackagingTaskSerializer < ActiveModel::Serializer

  attributes :name, :step, :step_order, :day_start, :packaging_steps

end
