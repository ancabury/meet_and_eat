class MealDate < ApplicationRecord
  has_and_belongs_to_many :users
  scope :in_the_future, -> { where('meal_time > ?', Time.now.midnight) }

  def participants
    users.pluck(:name).join(', ')
  end
end
