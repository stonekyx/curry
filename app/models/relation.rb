class Relation < Dove::Base
  self.abstract_class = true

  class PU < Relation
    self.table_name = 'relations_pu'

    define_data_fields(:READ_FIELD, [
      :id,
      :pid,
      :uid,
    ])

    define_data_fields(:WRITE_FIELD, [
      :pid,
      :uid,
    ])

    def self.find_via_uid id
      find(:all, :select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:uid => id})
    end
  end

  class TC < Relation
    self.table_name = 'relations_tc'

    define_data_fields(:READ_FIELD, [
      :id,
      :tid,
      :cid,
    ])

    define_data_fields(:WRITE_FIELD, [
      :tid,
      :cid,
    ])

    def self.find_via_tid id
      find(:all, :select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:tid => id})
    end
  end
end
