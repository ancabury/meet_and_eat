# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170705122506) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "meal_dates", force: :cascade do |t|
    t.string "restaurant_name"
    t.string "restaurant_address"
    t.datetime "meal_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meal_dates_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "meal_date_id"
    t.index ["meal_date_id"], name: "index_meal_dates_users_on_meal_date_id"
    t.index ["user_id"], name: "index_meal_dates_users_on_user_id"
  end

  create_table "proposals", force: :cascade do |t|
    t.integer "user_id"
    t.integer "request_id"
    t.boolean "filled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "restaurant_id"
  end

  create_table "requests", force: :cascade do |t|
    t.integer "user_id"
    t.string "meal_type"
    t.string "location"
    t.float "latitude"
    t.float "longitude"
    t.string "meal_time"
    t.boolean "filled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.float "lat"
    t.float "long"
    t.string "provider"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.string "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
  end

end
