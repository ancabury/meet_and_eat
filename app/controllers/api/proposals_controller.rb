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

  private

  def proposal_params
    params.require(:proposal).permit(:user_id, :request_id, restaurant_attributes: [:uid, :name, :address, :lat, :long, :provider])
  end

  def get_proposal
    @proposal = Proposal.find_by(id: params[:id])
  end
end
