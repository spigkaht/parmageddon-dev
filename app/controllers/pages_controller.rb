class PagesController < ApplicationController
  def index
  end

  def map
    @location = {
                  name: "Melbourne",
                  latitude: 37.8124,
                  longitude: 144.9623
                }
    @venues = Venue.all
    @markers = @venues.geocoded.map do |venue|
      {
        lat: venue.latitude,
        lng: venue.longitude
      }
    end
    debugger
  end
end
