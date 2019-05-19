require 'net/http'

url = URI.parse('http://api.brewerydb.com/v2/fermentables/?p=1&&key=324a96ac481682f2462d66504fb83b12&p=2')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
begin
JSON.parse(res.body)['data'].each do |data|
  data = data.symbolize_keys!
  puts data
  data_srm = data[:srm]
  @srm = nil
  puts "HERE1"
  if data_srm
    puts "HERE2"
    puts data_srm
    if Srm.exists?(data_srm["id"])
      @srm = Srm.find(data_srm["id"])
    else
      @srm = Srm.create!({id: data_srm["id"],
                          name: data_srm["name"],
                          hex: data_srm["hex"]})
    end
  end
  @fermentable = nil

  country = data[:country]
  country_of_origin =  country ? country["displayName"] : nil

    if Fermentable.exists?(data[:id])
      @fermentable = Fermentable.find(data[:id])
    else
      @fermentable = Fermentable.create!({id: data[:id], name: data[:name], description: data[:description], country_of_origin: country_of_origin, srm_id: @srm.try(:id), srm_precise: data[:srmPrecise], moisture_content: data[:moistureContent], dry_yield: data[:dryYield], potential: data[:potential], protein: data[:protein], max_in_batch: data[:maxInBatch], requires_mashing: data[:requiresMashing], category: data[:category], category_display: data[:categoryDisplay]})
    end
  end
end; nil


if @fermentable
  if characteristics = data[:characteristics]
    characteristics.each do |characteristic|
      begin
        FermentableCharacteristic.create({id: characteristic["id"], fermentable_id: @fermentable.id, name: characteristic['name'], description: characteristic['description']})
      rescue
      end
    end
  end
end


Srm.all.each do |srm|
  srm.destroy!
end

Fermentable.all.each do |fermentable|
  fermentable.destroy!
end

FermentableCharacteristic.all.each do |fc|
  fc.destroy!
end

