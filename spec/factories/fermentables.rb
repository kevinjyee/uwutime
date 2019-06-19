FactoryBot.define do
  factory :fermentable do
    name { "MyString" }
    description { "MyText" }
    country_of_origin { "MyString" }
    srm_precise { 1 }
    moisture_content { 1 }
    dry_yield { "9.99" }
    potential { "9.99" }
    protein { 1 }
    max_in_batch { "MyString" }
    requires_mashing { "MyString" }
    category { "MyString" }
    category_display { "MyString" }
  end
end
