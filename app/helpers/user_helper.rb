module UserHelper
  def user_signed_in?
    !current_user.nil?
  end
end
