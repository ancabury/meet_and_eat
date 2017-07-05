class Restaurants::RandomSelection
  def initialize(request)
    @request = request
  end

  def perform
    searcher = Restaurants::FoursquareSearcher.new(@request.meal_type, @request.location)
    restaurants = searcher.formatted_result([:name, :location])
    restaurants.sample
  end
end
