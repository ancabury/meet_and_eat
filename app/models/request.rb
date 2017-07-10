class Request < ApplicationRecord
  has_many :proposals
  belongs_to :user

  validates :location, :meal_type, :meal_time, :user_id, presence: true
  validates :meal_time, inclusion: { in: %w(breakfast brunch lunch dinner) }
  validates :location, :meal_type, length: { maximum: 200 }
end
