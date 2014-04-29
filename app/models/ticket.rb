class Ticket < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :pid,
    :name,
    :title,
    :created_at,
    :rid,
    :aid,
    :genre,
    :status,
    :fid,
    :description,
    :comments
  ])

  define_data_fields(:BRIEF_FIELD, [
    :id,
    :name,
    :title,
    :status
  ])

  def self.find_brief_info_via_paid(pid, aid)
    Ticket.find(:all, :select => get_data_fields(:BRIEF_FIELD).to_a, :conditions => {:pid => pid, :aid => aid})
  end
end
