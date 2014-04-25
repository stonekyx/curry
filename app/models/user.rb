class User < Dove::Base
  include Authentication

  define_data_fields(:READ_FIELD, [
    :id,
    :email,
    :password,
    :salt,
    :first_name,
    :last_name,
    :joined_at,
    :address
  ])

  define_data_fields(:WRITE_FIELD, [
    :email,
    :password,
    :first_name,
    :last_name,
    :address
  ])

  def self.find_via_id id
    User.find(:first, :conditions => {:id => id})
  end

  def self.find_via_email email
    User.find(:first, :conditions => {:email => email})
  end

  def authenticate password
    self.password_matches?(password)
  end

  def password_matches? password
    self.password == generate_hashed_password(password.to_s.strip, self.salt).first
  end

  def update_hash_to_save raw_hash
    hash = raw_hash.dup
    hash[:password], hash[:salt] = generate_hashed_password(hash[:password].to_s.strip)
    hash[:joined_at] = Time.now

    hash
  end
end
