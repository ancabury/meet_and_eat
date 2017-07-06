class Api::RequestsController < ApplicationController
  before_action :get_request, except: [:index, :create, :new]

  # GET /api/requests
  def index
    @requests = Request.all.order(:created_at)
    # render json: @requests
    render component: 'Requests', props: { requests: @requests }
  end

  # GET /api/requests/new
  def new
  end

  # POST /api/requests
  def create
    @request = Request.new(request_params)
    if @request.save!
      render json: { msg: 'Request was successfully created ' }, status: 200
    else
      render json: { msg: 'Error when creating request' }, status: 500
    end
  end

  # GET /api/requests/:id
  def show
    render json: @request
  end

  # PUT /api/requests/:id
  def update
    if @request.update_attributes(request_params)
      render json: { msg: 'Request was successfully updated ' }, status: 200
    else
      render json: { msg: 'Error when updating request' }, status: 500
    end
  end

  # DELETE /api/requests/:id
  def destroy
    @request.destroy
    render json: { msg: 'Request was deleted.' }, status: 200
  end

  private

  def get_request
    @request = Request.find_by(id: params[:id])
  end

  def request_params
    params.require(:request).permit(:user_id, :meal_type, :location, :meal_time)
  end
end
