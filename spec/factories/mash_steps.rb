FactoryBot.define do
  factory :mash_step do
    name { "MyString" }
    display_name { "MyString" }
    temperature { 1 }
    temperature_unit { "MyString" }
    duration_hours { 1 }
    step_order { 1 }
  end
end
