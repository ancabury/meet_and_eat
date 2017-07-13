class Api::LocationsController < ApplicationController
  def city
    result = Geocoder.search("#{params['lat']}, #{params['long']}")
    render json: result
  end
end
