#/beer/WHQisc/
#


ActiveRecord::Base.logger.level = 1
url = URI.parse('http://api.brewerydb.com/v2/beer/WHQisc/ingredients/?p=1&&key=324a96ac481682f2462d66504fb83b12&p=1')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
begin
  JSON.parse(res.body)['data'].each do |data|
    data = data.symbolize_keys!
    if ingredient = Ingredient.where({id: data[:id]}).present?
      puts ingredient.id
    end
  end
end;nil



