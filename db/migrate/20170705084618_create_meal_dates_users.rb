class CreateMealDatesUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :meal_dates_users do |t|
      t.belongs_to :user, index: true
      t.belongs_to :meal_date, index: true
    end
  end
end
