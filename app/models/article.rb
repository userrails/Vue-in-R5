class Article < ApplicationRecord
  validates_presence_of :title, :description

  has_many :discussions, dependent: :destroy
  accepts_nested_attributes_for :discussions, allow_destroy: true
end
