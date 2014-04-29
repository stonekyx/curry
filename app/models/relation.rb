class Relation < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :pid,
    :uid,
    :identity
  ])

  define_data_fields(:WRITE_FIELD, [
    :pid,
    :uid,
    :identity
  ])

  def self.find_via_uid id
    Relation.find(:all, get_data_fields(:WRITE_FIELD).to_a, :conditions => {:uid => id})
  end
end
