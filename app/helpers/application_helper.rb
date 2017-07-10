module ApplicationHelper
  def flash_type(name)
    name.to_s == 'success' ? 'success' : 'danger'
  end

  def control_area
    if user_signed_in?
      { controlLink: @right_links[:logout], user: { name: current_user.name, image_link: current_user.profile_picture } }
    end
  end
end
