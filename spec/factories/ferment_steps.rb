FactoryBot.define do
  factory :ferment_step, class: 'FermentSteps' do
    name {"MyString"}
    display_name {"MyString"}
    temperature {1}
    temperature_unit {"MyString"}
    pressure {1}
    pressure_unit {1}
    day {1}
    ferment_task_id {1}
  end
end
