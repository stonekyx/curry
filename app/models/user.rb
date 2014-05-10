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

  define_data_fields(:BRIEF_FIELD, [
    :email,
    :first_name
  ])

  def self.find_via_id id
    find(:first, :conditions => {:id => id})
  end

  def self.find_via_email email
    find(:first, :conditions => {:email => email})
  end

  def self.find_brief_info_via_id id
    find(:first, :select => get_data_fields(:BRIEF_FIELD).to_a, :conditions => {:id => id})
  end

  def self.check options={}
    item = find(:all, :select => :id, :conditions => options)

    #TODO: zacky, need to handle multi-users issue here.
    item.blank? ? -1 : item.first[:id]
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
