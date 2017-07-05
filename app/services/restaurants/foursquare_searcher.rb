class Restaurants::FoursquareSearcher
  def initialize(query, location, limit=50)
    @query = query
    @location = location
    @limit = limit
  end

  def search
    provider.search_venues(near: @location, query: @query, limit: @limit)
  end

  # options should contain the information for each venue (symbols)
  def formatted_result(options=[])
    search[:venues].collect do |venue|
      hash = {}
      options.collect { |o| hash[o] = venue[o] }
      hash
    end
  end

  private

  def provider
    @provider ||= Foursquare2::Client.new(client_id: Rails.application.secrets.foursquare_client_id,
                                  client_secret: Rails.application.secrets.foursquare_client_secret,
                                  api_version: FOURSQUARE_VERSION)
  end
end
