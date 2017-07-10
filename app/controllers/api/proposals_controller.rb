class Api::ProposalsController < ApplicationController
  before_action :get_proposal, except: [:index, :new, :create]

  # GET /api/proposals
  def index
    @proposals = Proposal.not_accepted
    render component: 'Proposals', props: { proposals: @proposals.as_json }
  end

  # POST /api/proposals
  def create
    @proposal = Proposal.new(proposal_params)
    if @proposal.request.user == current_user
      render json: { unauthorized: 'You are not allowed to perform this action' }, status: 403 and return
    end

    if @proposal.save!
      render json: { msg: 'Proposal successfully created' }, status: 200
    else
      render json: { msg: 'Error when creating proposal' }, status: 500
    end
  end

  # DELETE /api/proposals/:id
  def destroy
    if @proposal.user != current_user
      render json: { unauthorized: 'You are not allowed to perform this action' }, status: 403 and return
    end

    @proposal.destroy
    render json: { msg: 'Proposal successfully deleted' }, status: 200
  end

  # GET /api/proposals/:id/accept
  def accept
    unless @proposal.user != current_user && @proposal.request.user == current_user
      render json: { unauthorized: 'You are not allowed to perform this action' }, status: 403 and return
    end

    @proposal.update_attribute(:accepted, true)
    @restaurant = Restaurants::RandomSelection.new(@proposal.request).perform
    if @restaurant
      MealDate.create(users: [@proposal.request.user, @proposal.user],
                      restaurant_name: @restaurant[:name],
                      restaurant_address: @restaurant[:location][:address],
                      meal_time: DateTime.current.change(hour: MEAL_TIME[@proposal.request.meal_time.to_sym]))
      render json: { msg: 'Proposal accepted' }, status: 200
    else
      render json: { msg: 'No restaurants found' }, status: 500
    end
  end

  private

  def proposal_params
    params.require(:proposal).permit(:request_id).merge({ user_id: current_user.id })
  end

  def get_proposal
    @proposal = Proposal.find_by(id: params[:id])
  end
end
