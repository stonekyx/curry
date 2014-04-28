module Dove
  class Base < ActiveRecord::Base
    self.abstract_class = true

    def self.define_data_fields(name, fields)
      instance_variable_set("@DATA_FIELDS_#{name.to_s}", fields.to_set)
    end

    def self.get_data_fields(name)
      instance_variable_get("@DATA_FIELDS_#{name.to_s}")
    end

    def initialize(raw_hash={})
      super

      hash = update_hash_to_save(raw_hash)
      set_attr = lambda do |fields, hash|
        fields.each do |key|
          write_attribute(key, hash[key])
        end
      end
      set_attr.call(self.class.get_data_fields(:READ_FIELD), hash)
    end

    def update_hash_to_save raw_hash
      raw_hash
    end

    def save_itself
      self.save
    end

    #NOTE: zacky, skip nil values when to_json on ActiveRecord. See more at, http://stackoverflow.com/questions/7914022/skip-attributes-having-nil-values-when-to-json-on-activerecord
    def as_json options={}
      super(options).reject { |k, v| v.nil? }
    end
  end
end
