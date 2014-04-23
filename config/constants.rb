require 'yaml'

def get_path_of_configs(path)
  File.join(File.dirname(__FILE__), path)
end

STAGING = (Rails.env == 'development')

ALL_REGIONS = ['US']
ALL_LOCALES = {
  'US' => 'en-us'
}
DEFAULT_REGION = 'US'
SITE_REGION = ALL_REGIONS.include?(ENV['SITE_REGION']) ? ENV['SITE_REGION'] : DEFAULT_REGION
SITE_LOCALE = ALL_LOCALES[SITE_REGION]

require "./config/#{SITE_REGION.downcase}/constants"
include ConstantsPatch

COOKIES = YAML.load(IO.read(get_path_of_configs('cookies.yml')))
