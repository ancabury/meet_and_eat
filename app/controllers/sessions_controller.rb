class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(request.env['omniauth.auth'])
    session[:user_id] = user.id
    render json: "Successful authentication of user with id #{user.id}"
  end

  def destroy
    session[:user_id] = nil
    render json: "You were logged out of the application."
  end
end
