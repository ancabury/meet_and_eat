class AddAcceptedField < ActiveRecord::Migration[5.1]
  def change
    add_column :proposals, :accepted, :boolean, default: false
    remove_column :proposals, :filled, :boolean
    remove_column :requests, :filled, :boolean
  end
end
