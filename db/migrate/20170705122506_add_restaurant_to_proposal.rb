class AddRestaurantToProposal < ActiveRecord::Migration[5.1]
  def change
    add_column :proposals, :restaurant_id, :integer
  end
end
