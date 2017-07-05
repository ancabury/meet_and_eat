class CreateProposals < ActiveRecord::Migration[5.1]
  def change
    create_table :proposals do |t|
      t.integer :user_id
      t.integer :request_id
      t.boolean :filled

      t.timestamps
    end
  end
end
