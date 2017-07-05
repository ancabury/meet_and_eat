class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.float :lat
      t.float :long
      t.string :provider
      t.string :uid

      t.timestamps
    end
  end
end
