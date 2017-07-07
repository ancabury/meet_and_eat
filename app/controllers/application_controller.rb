class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user # The helper method tells rails we wish to use this in our helpers and views as well.
  before_action :menu_links

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def menu_links
    @links = [
      { name: 'Requests', path: api_requests_path },
      { name: 'Proposals', path: api_proposals_path },
      { name: 'Meal dates', path: api_meal_dates_path }
    ]
    @right_links = {
      login: { name: 'Log in with Google', path: '/auth/google_oauth2' },
      logout: { name: 'Log out', path: sign_out_path}
    }
  end
end
