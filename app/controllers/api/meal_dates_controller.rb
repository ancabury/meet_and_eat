class Api::MealDatesController < ApplicationController
  before_action :get_meal_date, except: [:index, :create]

  # GET /api/meal_dates
  def index
    @meal_dates = current_user.meal_dates.in_the_future
    render component: 'MealDates', props: { meal_dates: @meal_dates.as_json(
      only: [:id, :restaurant_name, :restaurant_address, :meal_time],
      methods: :participants) }
  end

  # POST /api/meal_dates
  def create
    @meal_date = MealDate.new(meal_dates_params)
    if @meal_date.save!
      render json: 'Meal date created successfully.', status: 200
    else
      render json: 'Error while creating meal date', status: 500
    end
  end

  # GET /api/meal_dates/:id
  def show
    render json: @meal_date, include: { users: { only: [:id, :name] } }
  end

  # PUT /api/meal_dates/:id
  def update
    if @meal_date.update_attributes(meal_dates_params)
      render json: 'Meal date updated successfully.', status: 200
    else
      render json: 'Error while updating meal date', status: 500
    end
  end

  # DELETE /api/meal_dates/:id
  def destroy
    @meal_date.destroy
    render json: 'Meal date successfully deleted', status: 200
  end

  private

  def get_meal_date
    @meal_date = MealDate.find_by(id: params[:id])
  end

  def meal_dates_params
    params.require(:meal_dates).permit(:restaurant_name, :restaurant_address, :meal_time, user_ids: [])
  end
end
