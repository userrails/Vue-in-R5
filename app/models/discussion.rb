class Discussion < ApplicationRecord
  belongs_to :article

  validates_presence_of :title, :description#, :article_id
end
