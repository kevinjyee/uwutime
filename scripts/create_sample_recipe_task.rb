# Profiles are your timelines for your recipe
# Dictate mash_time, fermentation_time, packaging_time
schedule_profile = ScheduleProfile.create!({name: 'Default Ale Profile'})
schedule_profile_id = schedule_profile.id
# Schedule Profile Has many

mash_task = MashTask.create!({name: 'Default Brew',
                  step: 'primary',
                  step_order: 1,
                  schedule_profile_id: schedule_profile_id})


MashStep.create!({name: 'Temperature1',
                  display_name: 'T1',
                  temperature: 60,
                  temperature_unit: 'F',
                  duration_hours: 1,
                  step_order: 1,
                  mash_task_id: mash_task.id
                  })


MashStep.create!({name: 'Temperature2',
                  display_name: 'T2',
                  temperature: 65,
                  temperature_unit: 'F',
                  duration_hours: 1,
                  step_order: 2,
                  mash_task_id: mash_task.id
                 })

MashStep.create!({name: 'Temperature3',
                  display_name: 'T3',
                  temperature: 70,
                  temperature_unit: 'F',
                  duration_hours: 1,
                  step_order: 3,
                  mash_task_id: mash_task.id
                 })


ferment_task_1 = FermentTask.create!({name: 'Ferment Primary',
                                      step: 'primary',
                                      step_order: 1,
                                      day_start: 1,
                                      schedule_profile_id: schedule_profile_id
                                     })

ferment_task_2 = FermentTask.create!({name: 'Ferment Secondary',
                                      step: 'secondary',
                                      step_order: 2,
                                      day_start: 14,
                                      schedule_profile_id: schedule_profile_id
                                     })


FermentStep.create!({
    name: 'Temp1',
    display_name: 'T1',
    temperature: 60,
    temperature_unit: 'F',
    day: 1,
    ferment_task_id: ferment_task_1.id})

FermentStep.create!({
                        name: 'Temp2',
                        display_name: 'T2',
                        temperature: 65,
                        temperature_unit: 'F',
                        day: 3,
                        ferment_task_id: ferment_task_1.id})

FermentStep.create!({
                        name: 'Temp3',
                        display_name: 'T3',
                        temperature: 70,
                        temperature_unit: 'F',
                        day: 5,
                        ferment_task_id: ferment_task_1.id})

FermentStep.create!({
                        name: 'Transfer',
                        display_name: 'Xfer',
                        temperature: 70,
                        temperature_unit: 'F',
                        day: 7,
                        ferment_task_id: ferment_task_1.id})



FermentStep.create!({
                        name: 'Temp1',
                        display_name: 'T1',
                        temperature: 70,
                        temperature_unit: 'F',
                        day: 7,
                        ferment_task_id: ferment_task_2.id})

FermentStep.create!({
                        name: 'Temp2',
                        display_name: 'T2',
                        temperature: 65,
                        temperature_unit: 'F',
                        day: 10,
                        ferment_task_id: ferment_task_2.id})

FermentStep.create!({
                        name: 'Transfer',
                        display_name: 'Xfer',
                        temperature: 60,
                        temperature_unit: 'F',
                        day: 14,
                        ferment_task_id: ferment_task_2.id})

packaging_task = PackagingTask.create!({
    name: 'Package',
    step: 'primary',
    step_order: 1,
    day_start: 14,
    schedule_profile_id: schedule_profile_id
                      })

PackagingStep.create!({
                          name: 'Package',
                          display_name: 'P1',
                          day: 14,
                          packaging_task_id: packaging_task.id
                      })


PackagingStep.create!({
                          name: 'Package',
                          display_name: 'P2',
                          day: 15,
                          packaging_task_id: packaging_task.id
                      })

Recipe.create!({
    name: 'Sample Blonde Ale',
    brew_type: 'Ale',
    schedule_profile_id: 1
               })
