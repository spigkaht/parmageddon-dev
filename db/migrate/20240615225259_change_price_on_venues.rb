class ChangePriceOnVenues < ActiveRecord::Migration[7.1]
  def change
    change_column :venues, :price_average, :decimal, precision: 4, scale: 2
  end
end
