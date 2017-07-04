class Api::UsersController < ApplicationController
  # GET /api/users
  def index
    @users = User.all
    render json: @users
  end

  # GET /api/users/:id
  def show
    @user = User.find_by(id: params[:id])
    render json: @user
  end
end
