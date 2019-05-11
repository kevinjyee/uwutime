class MashTaskSerializer < ActiveModel::Serializer

  attributes :name, :step, :step_order, :mash_steps

end
