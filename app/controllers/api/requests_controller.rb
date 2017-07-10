class Api::RequestsController < ApplicationController
  before_action :get_request, except: [:index, :create, :new]
  load_and_authorize_resource

  # GET /api/requests
  def index
    @requests = Request.all.order(:created_at)
    # render json: @requests
    render component: 'Requests', props: { requests: @requests.as_json(include: [ user: { only: [:name] }]) }
  end

  # POST /api/requests
  def create
    @request = Request.new(request_params)
    if @request.save
      json_request = @request.as_json(include: [ user: { only: [:name] }])
      render json: { msg: 'Request was successfully created ', request: json_request }, status: 200
    else
      render json: { msg: 'Error when creating request', errors: @request.errors.messages }, status: 500
    end
  end

  # PUT /api/requests/:id
  def update
    if @request.update_attributes(request_params)
      render json: { msg: 'Request was successfully updated ' }, status: 200
    else
      render json: { msg: 'Error when updating request', errors: @request.errors.messages }, status: 500
    end
  end

  # DELETE /api/requests/:id
  def destroy
    @request.destroy
    render json: { msg: 'Request was deleted.' }, status: 200
  end

  def handle_unauthorized_access
    render json: {
      unauthorized: 'You are not allowed to perform this action',
      request: @request.as_json(include: [ user: { only: [:name] }])
    }, status: 403
  end

  private

  def get_request
    @request = Request.find_by(id: params[:id])
  end

  def request_params
    params.require(:request).permit(:meal_type, :location, :meal_time).merge({ user_id: current_user.id })
  end
end
