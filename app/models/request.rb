class Request < ApplicationRecord
  has_many :proposals
  belongs_to :user

  scope :available, -> { left_joins(:proposals).distinct
                           .where(proposals: { accepted: [nil, false] }) }
  scope :completed, -> { joins(:proposals).where(proposals: { accepted: true }) }

  validates :location, :meal_type, :meal_time, :user_id, presence: true
  validates :meal_time, inclusion: { in: MEAL_TIME.keys.map(&:to_s) }
  validates :location, :meal_type, length: { maximum: 200 }
end
