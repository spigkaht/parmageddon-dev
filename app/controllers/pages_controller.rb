class PagesController < ApplicationController
  def index
  end

  def map
    @postcode = params[:postcode]
    @venues = Venue.where(postcode: @postcode)
  end

  def search
    @postcode = params[:postcode]

    venues_data = GooglePlacesApiCall.find_locations(@postcode)
    if venues_data.is_a?(Hash) && venues_data[:error].present?
      flash[:error] = venues_data[:error]
      redirect_to root_path and return
    end

    @venues = CreateVenuesByPlaces.create_venues(venues_data, @postcode)
    if @venues.is_a?(Hash) && @venues[:error].present?
      flash[:error] = @venues[:error]
      redirect_to root_path and return
    else
      render :map
    end
  end
end
