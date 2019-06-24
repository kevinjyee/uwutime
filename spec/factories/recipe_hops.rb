FactoryBot.define do
  factory :recipe_hop do
    recipe_id { 1 }
    hop_id { "MyString" }
    integer { "MyString" }
    alpha_acid_min { "9.99" }
    alpha_acid_max { "9.99" }
    beta_acid_min { "9.99" }
    beta_acid_max { "9.99" }
    humulene_min { "9.99" }
    humulene_max { "9.99" }
    caryophyllene_min { "9.99" }
    caryophyllene_max { "9.99" }
    cohumulone_min { "9.99" }
    cohumulone_max { "9.99" }
    myrcene_min { "9.99" }
    myrcene_max { "9.99" }
    farnesene_min { "9.99" }
    farnesene_max { "9.99" }
  end
end
