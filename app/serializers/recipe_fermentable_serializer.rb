class RecipeFermentableSerializer < BaseSerializer
  attributes :id, :name, :srm_precise, :dry_yield, :potential, :amount, :amount_unit,  :amount_and_unit

  def amount_and_unit
    "#{object.amount}#{object.amount_unit}"
  end
end
