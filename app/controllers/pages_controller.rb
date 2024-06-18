class PagesController < ApplicationController
  def index
  end

  def map
    # @location = {}
    # @location[:name] = Venue.first.city
    # @coords = Venue.first.geocode
    # @location[:latitude] = @coords[0]
    # @location[:longitude] = @coords[1]

    @venues = Venue.all
  
    # @markers = @venues.map do |venue|
    # venue_coords = venue.geocode
    #   {
    #     name: venue.name,
    #     lat: venue_coords[0],
    #     lng: venue_coords[1]
    #   }
    # end
  end
end
