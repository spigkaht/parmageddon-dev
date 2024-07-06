class ReviewsController < ApplicationController
  before_action :set_venue, only: %i[new create]

  def new
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    @review.venue = @venue
    @review.save
    redirect_to map_path
  end

  # https://www.hotrails.dev/articles/rails-modals-with-hotwire
  # require index(?), new, create
  # routes will be /map ?
  # strong params for review (which columns?)
  # view w/ link to create new review
  # view for new review - view or partial view?
  # will require turbo frame with id new_review
  # turbo frame will render reviews/form
  # form partial with form_with
  # turbo stream????
  # add modal turbo frame to application.html.erb
  # change all new_item ids to modal
  # create and update stimulus controller

  private

  def set_venue
    @venue = Venue.find(params[:venue_id])
  end

  def review_params
    params.require(:review).permit(:total_rating,
                                   :chicken_rating,
                                   :crumb_rating,
                                   :topping_rating,
                                   :sides_rating,
                                   :venue_rating,
                                   :comment)
  end
end
