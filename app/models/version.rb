class Version < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :pid,
    :is_alive,
    :sprint
  ])

  define_data_fields(:WRITE_FIELD, [
    :pid,
    :sprint
  ])

  def self.find_via_id id
    find(:first, :select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:id => id, :is_alive => true})
  end

  def self.check options={}
    return -1 if options[:pid].blank? || options[:sprint].blank?

    options[:is_alive] = options[:is_alive] || true
    item = find(:first, :select => :id, :conditions => options)

    item.blank? ? -1 : item[:id]
  end
end
