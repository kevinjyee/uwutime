module SerializationScope
  extend ActiveSupport::Concern

  included do
    serialization_scope :serializer_scope
  end

  def serializer_scope
    { includes: includes, fields: fields }
  end

  def includes
    {}
  end

  def fields
    []
  end

end
