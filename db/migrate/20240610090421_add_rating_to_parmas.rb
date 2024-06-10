class AddRatingToParmas < ActiveRecord::Migration[7.1]
  def change
    add_column :parmas, :chicken_rating_average, :decimal, precision: 2, scale: 1
  end
end
