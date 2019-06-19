FactoryBot.define do
  factory :recipe do
    name { "MyString" }
    brew_type { "MyString" }
    brew_hours { "" }
    ferment_days { 1 }
    packaging_days { 1 }
  end
end
