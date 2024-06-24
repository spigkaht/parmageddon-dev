class PagesController < ApplicationController
  def index
  end

  def map
    @postcode = params[:p]
    @venues = Venue.all
  end
end
