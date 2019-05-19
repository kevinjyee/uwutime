require 'net/http'

url = URI.parse('http://api.brewerydb.com/v2/hops/?p=1&&key=324a96ac481682f2462d66504fb83b12&p=1')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
begin
JSON.parse(res.body)['data'].each do |data|
  data = data.symbolize_keys!
  country = data[:country]
  country_of_origin =  country ? country["displayName"] : nil

    if Hop.exists?(data[:id])
      @hop = Hop.find(data[:id])
    else
      Hop.create({id: data[:id], name: data[:name], description: data[:description], country_of_origin: country_of_origin, alpha_acid_min: data[:alphaAcidMin], alpha_acid_max: data[:alphaAcidMax], beta_acid_min: data[:betaAcidMin], beta_acid_max: data[:betaAcidMax], humulene_min: data[:humuleneMin], humulene_max: data[:humuleneMax], caryophyllene_min: data[:caryophylleneMin], caryophyllene_max: data[:caryophylleneMax], cohumulone_min: data[:cohumuloneMin], cohumulone_max: data[:cohumuloneMax], myrcene_min: data[:myrceneMin], myrcene_max: data[:myrceneMax], farnesene_min: data[:farneseneMin], farnesene_max: data[:farneseneMax], is_noble: data[:isNoble], for_bittering: data[:forBittering], for_flavor: data[:forFlavor], for_aroma: data[:forAroma], category: data[:category], category_display: data[:category_display]})
    end
  end
end; nil
