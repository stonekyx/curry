module Dove
  class Base < ActiveRecord::Base
    self.abstract_class = true

    def self.define_data_fields(name, fields)
      instance_variable_set("@DATA_FIELDS_#{name.to_s}", fields.to_set)
    end

    def self.get_data_fields(name)
      instance_variable_get("@DATA_FIELDS_#{name.to_s}")
    end
  end
end
