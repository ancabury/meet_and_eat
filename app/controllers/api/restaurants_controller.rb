class Api::RestaurantsController < ApplicationController
  # GET /api/restaurants
  def index
    searcher = Restaurants::FoursquareSearcher.new(params[:q], params[:location])
    render json: searcher.formatted_result([:name, :location])
  end
end
