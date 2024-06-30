class PagesController < ApplicationController
  before_action :check_for_reload, only: :map

  def index
    reset_map_session
  end

  def map
    check_for_reload and return if session[:map_page_visited]

    session[:map_page_visited] = true

    @postcode = params[:postcode]
    @venues = Venue.where(postcode: @postcode)
  end

  def search
    @postcode = params[:postcode]

    venues_data = GooglePlacesApiCall.find_locations(@postcode)
    if venues_data.is_a?(Hash) && venues_data[:error].present?
      flash[:notice] = venues_data[:error]
      redirect_to root_path and return
    end

    @venues = CreateVenuesByPlaces.create_venues(venues_data, @postcode)
    if @venues.is_a?(Hash) && @venues[:error].present?
      flash[:notice] = @venues[:error]
      redirect_to root_path and return
    else
      render :map
    end
  end

  def check_for_reload
    if session[:map_page_visited]
      flash[:notice] = "Reload your search!"
      redirect_to root_path
    else
      session[:map_page_visited] = true
    end
  end

  def reset_map_session
    session.delete(:map_page_visited)
  end
end
