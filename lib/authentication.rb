module Authentication
  def store_user
  end

  #NOTE: SALT is used to identify users' password uniquely.
  def generate_salt
    ele = [('0'..'9'), ('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
    ele.shuffle[0, 8].join
  end

  def generate_hashed_password(password, salt=nil)
    salt ||= generate_salt
    [Digest::SHA1.hexdigest([password, salt].join), salt]
  end
end
