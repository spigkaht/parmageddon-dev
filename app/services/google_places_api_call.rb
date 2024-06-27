require "uri"
require "net/http"

class GooglePlacesApiCall
  def self.find_locations(postcode)
    endpoint = "https://maps.googleapis.com/maps/api"
    api_key = ENV.fetch('GMAPS_API_KEY')
    radius = "5000"
    type = "bar"

    begin
      uri = URI("#{endpoint}/geocode/json?address=#{postcode}&key=#{api_key}")
      response = Net::HTTP.get(uri)
      geocode_results = JSON.parse(response)["results"]

      if geocode_results.any?
        location = geocode_results.first["geometry"]["location"]
        latitude = location["lat"]
        longitude = location["lng"]

        uri = URI("#{endpoint}/place/nearbysearch/json?location=#{latitude},#{longitude}&radius=#{radius}&type=#{type}&key=#{api_key}")
        response = Net::HTTP.get(uri)
        JSON.parse(response)["results"]
      else
        { error: "No results found for the provided postcode." }
      end
    rescue StandardError => e
      { error: "An error occurred: #{e.message}" }
    end
  end
end
