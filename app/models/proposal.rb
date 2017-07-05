class Proposal < ApplicationRecord
  belongs_to :restaurant
  accepts_nested_attributes_for :restaurant
end
