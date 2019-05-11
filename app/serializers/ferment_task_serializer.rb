class FermentTaskSerializer < ActiveModel::Serializer

  attributes :name, :step, :step_order, :day_start, :ferment_steps

end
