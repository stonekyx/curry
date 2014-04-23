module Authentication
  SESSION_AGE = 3.year

  def store_user
    return unless @user && @user.id

    set_cookie_by_key('CURRY_UID', @user.id)
    set_cookie_by_key('CURRY_UNAME', @user.first_name)

    reset_session
    session[:user_id] = @user.id
  end

  def clear_user
    Cookies.get_all_configs.each do |key, config|
      next if cookies[config[:name]].blank?
      set_cookie_by_key(key, nil) unless config[:keep_on_logout]
    end

    reset_session
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
