class Venue < ApplicationRecord
  has_many :parmas, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :street,
    :city,
    :state,
    :zip,
    :latitude,
    :longitute,
    :rating_average,
    :price_average,
    presence: true
end
