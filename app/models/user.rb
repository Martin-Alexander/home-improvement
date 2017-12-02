class User < ApplicationRecord
  has_many :projects, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates_presence_of :first_name, :last_name

  devise :omniauthable, 
    :database_authenticatable,
    :registerable,
    :rememberable,
    :trackable,
    :validatable,
    omniauth_providers: [:facebook]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.facebook_picture_url = auth.info.facebook_picture_url
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
