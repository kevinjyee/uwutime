FactoryBot.define do
  factory :recipe_fermentable do
    recipe_id { "" }
    fermentable_id { "" }
    moisture_content { "" }
    dry_yield { "" }
    potential { "" }
    protein { 1 }
    requires_mashing { "MyString" }
  end
end
