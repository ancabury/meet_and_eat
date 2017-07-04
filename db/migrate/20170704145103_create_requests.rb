class CreateRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :requests do |t|
      t.integer :user_id
      t.string :meat_type
      t.string :location
      t.float :latitude
      t.float :longitude
      t.datetime :meal_time
      t.boolean :filled

      t.timestamps
    end
  end
end
