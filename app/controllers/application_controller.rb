class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user # The helper method tells rails we wish to use this in our helpers and views as well.
  before_action :menu_links
  before_action :authenticate_user
  rescue_from CanCan::AccessDenied do |_exception|
    handle_unauthorized_access
  end

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

  def authenticate_user
    if current_user.nil?
      # the user has to log in
      redirect_to new_session_path, flash: { error: 'You must sign in.' }
    end
  end

  def handle_unauthorized_access
    respond_to do |format|
      format.json { render json: { unauthorized: I18n.t('flash.messages.unauthorized') },
                    status: 403 }
      format.html { redirect_to root_path, flash: { error: I18n.t('flash.messages.unauthorized') } }
    end
  end
end
