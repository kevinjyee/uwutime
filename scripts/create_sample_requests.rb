template = {'product_name' => '',
 'run_quantity' => 2,
 'requested_preferred_date' => '2019-01-01',
 'notes' => 'N/A',
 'status' => ScheduleRequest::NOT_SCHEDULED,
 'scheduled' => false}



beer_styles = ['Brown', 'IPA', 'Pale Ale', 'Whiskey Stout', 'Rye Beer']

beer_styles.each do |style|
  template['product_name'] = style
  ScheduleRequest.create!(template)
end


ScheduleRequest.unscoped.all.each do |schedule|
  schedule.destroy!
end