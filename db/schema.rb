# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_10_225510) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "parmas", force: :cascade do |t|
    t.string "title"
    t.bigint "venue_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "total_rating_average", precision: 2, scale: 1
    t.decimal "crumb_rating_average", precision: 2, scale: 1
    t.decimal "topping_rating_average", precision: 2, scale: 1
    t.decimal "sides_rating_average", precision: 2, scale: 1
    t.decimal "venue_rating_average", precision: 2, scale: 1
    t.decimal "price", precision: 4, scale: 2
    t.decimal "chicken_rating_average", precision: 2, scale: 1
    t.index ["venue_id"], name: "index_parmas_on_venue_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "question"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "total_rating", precision: 2, scale: 1
    t.decimal "chicken_rating", precision: 2, scale: 1
    t.decimal "crumb_rating", precision: 2, scale: 1
    t.decimal "topping_rating", precision: 2, scale: 1
    t.decimal "sides_rating", precision: 2, scale: 1
    t.decimal "venue_rating", precision: 2, scale: 1
    t.bigint "parma_id", null: false
    t.index ["parma_id"], name: "index_reviews_on_parma_id"
  end

  create_table "venues", force: :cascade do |t|
    t.string "name"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.decimal "rating_average", precision: 2, scale: 1
    t.decimal "price_average", precision: 2, scale: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "parmas", "venues"
  add_foreign_key "reviews", "parmas"
end
