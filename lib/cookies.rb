class Cookies
  class << self
    def get_all_configs
      configs = {}
      COOKIES.each do |key, value|
        configs[key] = value
      end

      configs
    end
  end
end
