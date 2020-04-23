class User < ApplicationRecord
  attr_reader :password

  validates :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, allow_nil: true, length: { minimum: 6 }

  before_validation :ensure_session_token 

  has_many :tracks,
    foreign_key: :user_id,
		class_name: :Track,
		primary_key: :id,
		dependent: :destroy

	has_many :likes,
		dependent: :destroy
		
  has_many :liked_tracks,
		through: :likes,
		source: :track

	has_many :comments,
		dependent: :destroy,
		class_name: :Comment,
		primary_key: :id,
		foreign_key: :user_id


  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.valid_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save
    self.session_token
  end
  
end
