class CreateMealDates < ActiveRecord::Migration[5.1]
  def change
    create_table :meal_dates do |t|
      t.string :restaurant_name
      t.string :restaurant_address
      t.datetime :meal_time

      t.timestamps
    end
  end
end
