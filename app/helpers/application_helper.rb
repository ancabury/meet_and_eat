module ApplicationHelper
  def control_area
    if current_user.nil?
      { controlLink: @right_links[:login] }
    else
      { controlLink: @right_links[:logout], user: current_user.name }
    end
  end
end
