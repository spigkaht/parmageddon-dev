class PagesController < ApplicationController
  def index
  end

  def map
    @location = {}
    @location[:name] = Venue.first.city
    @coords = Venue.first.geocode
    @location[:latitude] = @coords[0]
    @location[:longitude] = @coords[1]

    @venues = Venue.all
    @markers = @venues.map do |venue|
      {
        name: venue.name,
        lat: venue.latitude,
        lng: venue.longitude
      }
    end
  end
end
