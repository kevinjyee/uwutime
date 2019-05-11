class BaseSerializer < ActiveModel::Serializer

  protected

  def includes
    scope[:includes] || {}
  end
end
