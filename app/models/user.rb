class User < Dove::Base
  include Authentication

  define_data_fields(:READ_FIELD, [
    :id,
    :email,
    :password,
    :salt,
    :first_name,
    :last_name,
    :joined_at
  ])

  define_data_fields(:WRITE_FIELD, [
    :email,
    :password,
    :first_name,
    :last_name
  ])

  def initialize(raw_hash={})
    super

    hash = update_hash_to_save(raw_hash)
    set_attr = lambda do |fields, hash|
      fields.each do |key|
        write_attribute(key, hash[key])
      end
    end
    set_attr.call(User.get_data_fields(:READ_FIELD), hash)
  end

  def self.authenticate(email, password)
    action_user = find_via_email(email)
    return false if action_user.blank?

    action_user.password_matches?(password)
  end

  def self.find_via_id id
    User.find(:first, :conditions => {:id => id})
  end

  def self.find_via_email email
    User.find(:first, :conditions => {:email => email})
  end

  def save_myself
    self.save
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
