class Message < Dove::Base

  define_data_fields(:READ_FIELD, [
    :id,
    :sid,
    :rid,
    :sent_at,
    :genre,
    :project_name,
    :description
  ])

  define_data_fields(:WRITE_FIELD, [
    :sid,
    :rid,
    :sent_at,
    :genre,
    :project_name,
    :description
  ])

  def self.find_via_sid id
    sent_items = []
    find_each(:select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:sid => id}) do |item|
      item[:mailer] = User.find_brief_info_via_id(item[:rid])
      item[:sid] = nil
      item[:rid] = nil
      sent_items << item
    end

    sent_items
  end

  def self.find_via_rid id
    received_items = []
    find_each(:select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:rid => id}) do |item|
      item[:mailer] = User.find_brief_info_via_id(item[:sid])
      item[:sid] = nil
      item[:rid] = nil
      received_items << item
    end

    received_items
  end

  def update_hash_to_save raw_hash
    hash = raw_hash.dup
    hash[:sent_at] = Time.now

    hash
  end
end
