class CreateVenues < ActiveRecord::Migration[7.1]
  def change
    create_table :venues do |t|
      t.string :name
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.decimal :rating_average, precision: 2, scale: 1
      t.decimal :price_average, precision: 2, scale: 1
      t.timestamps
    end
  end
end
