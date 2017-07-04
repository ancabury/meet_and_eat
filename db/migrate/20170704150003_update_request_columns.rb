class UpdateRequestColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :requests, :meat_type, :meal_type
    change_column :requests, :meal_time, :string
  end
end
