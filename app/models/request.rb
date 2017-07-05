class Request < ApplicationRecord
  has_many :proposals
  belongs_to :user
end
