class Api::LocationsController < ApplicationController
  def city
    result = Geocoder.search([params['lat'], params['long']]).first
    render json: { city: result.city }
  end
end
