class AddNumbersToParmas < ActiveRecord::Migration[7.1]
  def change
    add_column :parmas, :total_rating_average, :decimal, precision: 2, scale: 1
    add_column :parmas, :crumb_rating_average, :decimal, precision: 2, scale: 1
    add_column :parmas, :topping_rating_average, :decimal, precision: 2, scale: 1
    add_column :parmas, :sides_rating_average, :decimal, precision: 2, scale: 1
    add_column :parmas, :venue_rating_average, :decimal, precision: 2, scale: 1
    add_column :parmas, :price, :decimal, precision: 4, scale: 2
  end
end
