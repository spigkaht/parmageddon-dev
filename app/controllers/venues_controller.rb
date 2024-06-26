require 'net/http'
require 'json'

class VenuesController < ApplicationController
  before_action :set_venue, only: [:show]

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def create_and_show
    postcode = params[:postcode]
    radius = params[:radius] || "5000"
    type = params[:type] || "bar"
    api_key = ENV['GOOGLE_MAPS_API_KEY']

    # gecode postcode to retrieve latitude and longitude
    geocode_uri = URI("https://maps.googleapis.com/maps/api/geocode/json?address=#{postcode}&key=#{api_key}")
    geocode_response = Net::HTTP.get(geocode_uri)
    geocode_results = JSON.parse(geocode_response)["results"]
    if geocode_results.any?
      location = geocode_results.first["geometry"]["location"]
      latitude = location["lat"]
      longitude = location["lng"]

      # query google places api
      places_uri = URI("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{latitude},#{longitude}&radius=#{radius}&type=#{type}&key=#{api_key}")
      places_response = Net::HTTP.get(places_uri)
      @places_results = JSON.parse(places_response)["results"]

      # create venue instances
      # @places_results.each do |place|
      #   Venue.create(
      #     name: place["name"],
      #     street: place["vicinity"].split(",")[0],
      #     city: place["vicinity"].split(",")[1],
      #     state: geocode_results.first["address_components"][3]["long_name"],
      #     zip: geocode_results.first["address_components"][0]["long_name"],
      #     latitude: place["geometry"]["location"]["lat"],
      #     longitude: place["geometry"]["location"]["lng"],
      #     rating_average: 0.0,
      #     price_average: 0.0
      #   )
      # end

      @venues = Venue.all
      # render map view
      render "pages/map"
    else
      flash[:error] = "Postcode not found"
      redirect_to root_path
    end
  end

  private

  def set_venue
    @venue = Venue.find(params[:id])
  end
end
