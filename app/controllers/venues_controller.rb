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

  private

  def set_venue
    @venue = Venue.find(params[:id])
  end
end
