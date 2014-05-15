class Ticket < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :pid,
    :genre,
    :name,
    :title,
    :created_at,
    :priority,
    :status,
    :rid,
    :aid,
    :fid,
    :description,
  ])

  define_data_fields(:BRIEF_FIELD, [
    :id,
    :name,
    :title,
    :status
  ])

  def self.find_via_id(id)
    Ticket.find(:first, :select => get_data_fields(:READ_FIELD).to_a, :conditions => {:id => id})
  end

  def self.find_brief_info_via_paid(pid, aid)
    Ticket.find(:all, :select => get_data_fields(:BRIEF_FIELD).to_a, :conditions => {:pid => pid, :aid => aid})
  end

  def polish_data
    data = {}

    data[:reporter] = User.find_brief_info_via_id(self[:rid])
    data[:assignee] = User.find_brief_info_via_id(self[:aid])
    data[:fix_version] = Version.find_via_id(self[:fid])[:sprint]
    data[:comments] = Comment.find_via_tid(self[:id])

    self[:rid] = nil
    self[:aid] = nil
    self[:fid] = nil

    data
  end

  def update_hash_to_save raw_hash
    hash = raw_hash.dup
    hash[:created_at] = Time.now
    hash[:status] = 0

    hash
  end
end
