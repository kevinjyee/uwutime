FactoryBot.define do
  factory :recipe_yeast do
    recipe_id { 1 }
    yeast_id { 1 }
    attenuation_min { "9.99" }
    attenuation_max { "9.99" }
    ferment_temp_min { "9.99" }
    ferment_temp_max { "9.99" }
    alcohol_tolerance_min { "9.99" }
    alcohol_tolerance_max { "9.99" }
  end
end
