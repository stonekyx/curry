require 'yaml'

def get_path_of_configs(path)
  File.join(File.dirname(__FILE__), path)
end

COOKIES = YAML.load(IO.read(get_path_of_configs('cookies.yml')))
