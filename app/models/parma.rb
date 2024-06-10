class Parma < ApplicationRecord
  belongs_to :venue
  has_many :reviews, dependent: :destroy

  validates :title,
            :total_rating_average,
            :crumb_rating_average,
            :topping_rating_average,
            :sides_rating_average,
            :venue_rating_average,
            :price,
            presence: true
end
