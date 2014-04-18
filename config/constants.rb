require 'yaml'

def get_path_of_configs(path)
  File.join(File.dirname(__FILE__), path)
end

ALL_REGIONS = ['US']
ALL_LOCALES = {
  'US' => 'en-us'
}
DEFAULT_REGION = 'US'
SITE_REGION = ALL_REGIONS.include?(ENV['SITE_REGION']) ? ENV['SITE_REGION'] : DEFAULT_REGION
SITE_LOCALE = ALL_LOCALES[SITE_REGION]

COOKIES = YAML.load(IO.read(get_path_of_configs('cookies.yml')))
