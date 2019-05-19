require 'net/http'

url = URI.parse('http://api.brewerydb.com/v2/yeasts/?p=1&&key=324a96ac481682f2462d66504fb83b12&p=1')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
begin
JSON.parse(res.body)['data'].each do |data|
  data = data.symbolize_keys!


    if Yeast.exists?(data[:id])
      @yeast =Yeast.find(data[:id])
    else
      Yeast.create!({name: data[:name], description: data[:description], yeast_type: data[:yeastType], attenuation_min: data[:attenuationMin], attenuation_max: data[:attenuationMax], ferment_temp_min: data[:fermentTempMin], ferment_temp_max: data[:fermentTempMax], alcohol_tolerance_min: data[:alcoholToleranceMin], alcohol_tolerance_max: data[:alcoholToleranceMax], supplier: data[:supplier], yeast_format: data[:yeastFormat], category: data[:yeast], category_display: data[:categoryDisplay]})
    end
  end
end; nil
