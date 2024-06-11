class Poll < ApplicationRecord
  validates :question, :answer, presence: true
end
