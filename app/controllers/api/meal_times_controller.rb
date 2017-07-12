class Api::MealTimesController < ApplicationController
  def index
    options = MEAL_TIME.keys.map(&:to_s)
    render json: { options: options }
  end
end
