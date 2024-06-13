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
  after_validation :geocode
end
