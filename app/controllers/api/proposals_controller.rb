class Api::ProposalsController < ApplicationController
  before_action :get_proposal, except: [:index, :new, :create]

  # GET /api/proposals
  def index
    @proposals = current_user.proposals
    render json: @proposals
  end

  # GET /api/proposals/new
  def new
  end

  # POST /api/proposals
  def create
    @proposal = Proposal.new(proposal_params)
    if @proposal.save!
      render json: 'Proposal successfully created', status: 200
    else
      render json: 'Error when creating proposal', status: 500
    end
  end

  # GET /api/proposals/:id
  def show
    render json: @proposal
  end

  # GET /api/proposals/:id/edit
  def edit
  end

  # PUT /api/proposals/:id
  def update
    if @proposal.update_attributes(proposal_params)
      render json: 'Proposal successfully updated', status: 200
    else
      render json: 'Error when updating proposal', status: 500
    end
  end

  # DELETE /api/proposals/:id
  def destroy
    @proposal.destroy
    render json: 'Proposal successfully deleted', status: 200
  end

  # GET /api/proposals/:id/accept
  def accept
    #check that @current_user == @proposal.request.user
    @proposal.update_attribute(:accepted, true)
    @restaurant = Restaurants::RandomSelection.new(@proposal.request).perform
    if @restaurant
      MealDate.create(users: [@proposal.request.user, @proposal.user],
                      restaurant_name: @restaurant[:name],
                      restaurant_address: @restaurant[:location][:address],
                      meal_time: DateTime.current.change(hour: MEAL_TIME[@proposal.request.meal_time.to_sym]))
      render json: 'Proposal accepted', status: 200
    else
      render json: 'No restaurants found', status: 500
    end
  end

  private

  def proposal_params
    params.require(:proposal).permit(:user_id, :request_id)
  end

  def get_proposal
    @proposal = Proposal.find_by(id: params[:id])
  end
end
