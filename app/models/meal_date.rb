class MealDate < ApplicationRecord
  has_and_belongs_to_many :users
  scope :in_the_future, -> { where('meal_time > ?', Time.now.midnight) }

  def meal_time
    time = super
    time.strftime('%d/%m/%Y %H:%M')
  end

  def participants
    users.pluck(:name).join(', ')
  end
end
