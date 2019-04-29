  identifiers = %w(
  V7201
  V7202
  V7203
  V7204
  V7205
  V7206
  V7207)


  identifiers.each do |identifier|
    Vessel.create!({identifier: identifier, volume: 10,
                    volume_unit: 'liter',
                    vessel_type: 'fermenter'})
  end