

puts "Clearing out your junk.."
Venue.destroy_all
puts "Clean!"

venues = [
  {
    name: "Cardinia Club",
    street: "71 Racecourse Rd",
    city: "Pakenham",
    state: "Victoria",
    zip: "3810"
  },
  {
    name: "Club Officer",
    street: "3 Niki Pl",
    city: "Officer",
    state: "Victoria",
    zip: "3809"
  },
  {
    name: "Pink Hill Hotel",
    street: "20 Pink Hill Blvd",
    city: "Beaconsfield",
    state: "Victoria",
    zip: "3807"
  },
  {
    name: "Railway Hotel Pakenham",
    street: "153 Main St",
    city: "Pakenham",
    state: "Victoria",
    zip: "3810"
  },
  {
    name: "Castello's Cardinia Hotel",
    street: "108-110 Princes Hwy",
    city: "Pakenham",
    state: "Victoria",
    zip: "3810"
  }
]

5.times do |i|
  venue = Venue.new(
                    name: venues[i][:name],
                    street: venues[i][:street],
                    city: venues[i][:city],
                    state: venues[i][:state],
                    zip: venues[i][:zip],
                    rating_average: 4.5,
                    price_average: 19.5
                    )
  venue.save
  puts "#{i + 1} done"
end
puts "Venues added!"

puts "All finished!"
