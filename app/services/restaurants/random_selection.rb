class Restaurants::RandomSelection
  def initialize(request)
    @request = request
  end

  def perform
    return false if @request.nil?
    return false if @request.meal_type.blank? || @request.location.blank?

    searcher = Restaurants::FoursquareSearcher.new(@request.meal_type, @request.location)
    restaurants = searcher.formatted_result([:name, :location])
    restaurants.sample
  end
end
