FactoryBot.define do
  factory :recipe_ingredient do
    amount { "" }
    amount_unit { "MyString" }
    duration { 1 }
    duration_unit { "MyString" }
  end
end
