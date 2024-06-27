class CreateVenuesByPlaces
  def self.create_venues(venues_data, postcode)
    venues_data.map do |venue|
      Venue.find_by(name: venue["name"]) ||
      (venue = Venue.new(name: venue["name"],
                     street: venue["vicinity"].split(',')[0],
                     city: venue["vicinity"].split(',')[1],
                     state: "VIC",
                     postcode: postcode,
                     latitude: venue["geometry"]["location"]["lat"],
                     longitude: venue["geometry"]["location"]["lng"],
                     rating_average: 0.0,
                     price_average: 0.0))
    end
  end
end
