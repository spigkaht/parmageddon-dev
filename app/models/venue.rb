class Venue < ApplicationRecord
  has_many :parmas, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :street,
    :city,
    :state,
    :zip,
    :rating_average,
    :price_average,
    presence: true

  def address
    [street, city, state, zip].compact.join(', ')
  end

  geocoded_by :address
  after_save :geocode

  after_validation :log_address_change, if: :street_changed?

  def log_address_change
    Rails.logger.debug "Coordinates changed from #{longitude_was} to #{longitude}"
    Rails.logger.debug "Street address changed from #{street_was} to #{street}"
  end
end
