class Cookies
  class << self
    def get_config_by_key key
      yml = COOKIES[key.to_s]
      raise "cookie #{key} not defined in cookies.yml" if yml.blank? || yml["name"].blank?

      config = {:name => yml["name"]}

      if yml["expires_in"] =~ /^([0-9]+)(s|m|h|d|mo|y)$/
        num = $1.to_i
        config[:expires_in] =
          case $2
          when "s"
            num.second
          when "m"
            num.minute
          when "h"
            num.hour
          when "d"
            num.day
          when "mo"
            num.month
          when "y"
            num.year
          end
      else
        config[:expires_in] = Authentication::SESSION_AGE
      end

      config[:path] = yml["path"] || "/"
      config[:secure] = yml["secure"] || false
      config[:httponly] = yml["httponly"] || false
      config[:use_domain] = yml["use_domain"] || false

      config
    end

    def get_all_configs
      configs = {}
      COOKIES.each do |key, value|
        configs[key] = value
      end

      configs
    end
  end
end
