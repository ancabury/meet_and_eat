module ApplicationHelper
  def flash_type(name)
    name.to_s == 'success' ? 'success' : 'danger'
  end

  def control_area
    if user_signed_in?
      { controlLink: @right_links[:logout], user: current_user.name }
    end
  end
end
