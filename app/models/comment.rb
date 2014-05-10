class Comment < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :uid,
    :created_at,
    :content
  ])

  define_data_fields(:WRITE_FIELD, [
    :uid,
    :created_at,
    :content
  ])

  def self.find_via_tid id
    cid_list = Relation::TC.where(:tid => id).pluck(:cid).uniq

    find_via_id(cid_list)
  end

  def self.find_via_id id_list
    comments = []
    find_each(:select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:id => id_list}) do |item|
      item[:publisher] = User.find_brief_info_via_id(item[:uid])
      item[:uid] = nil
      comments << item
    end

    comments
  end

  def update_hash_to_save raw_hash
    hash = raw_hash.dup
    hash[:created_at] = Time.now

    hash
  end
end
