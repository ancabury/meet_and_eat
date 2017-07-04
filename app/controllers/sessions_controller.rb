class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(request.env['omniauth.auth'])
    session[:user_id] = user.id
    redirect_to root_path
    # render json: "Successful authentication of user with id #{user.id}"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
    # render json: "You were logged out of the application."
  end
end
