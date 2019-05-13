require 'net/http'

url = URI.parse('http://api.brewerydb.com/v2/ingredients/?p=1&&key=324a96ac481682f2462d66504fb83b12')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
JSON.parse(res.body)['data'].each do |data|
  Ingredient.create!(id: data['id'],
                     name: data['name'],
                     category: data['category'],
                     categoryDisplay: data['categoryDisplay']
                     )
end