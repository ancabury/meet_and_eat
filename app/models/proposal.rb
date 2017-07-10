class Proposal < ApplicationRecord
  belongs_to :request
  belongs_to :user

  scope :not_accepted, -> { where(accepted: false) }

  validates :user_id, uniqueness: { scope: :request_id }

  def as_json(options={})
    super(only: [:id],
          include: { user: { only: [:name] },
                     request: { only: [:location, :meal_time, :meal_type]} })
  end
end
