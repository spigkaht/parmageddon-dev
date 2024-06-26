class PagesController < ApplicationController
  def index
  end

  def map
    @postcode = params[:postcode]
  end
end
