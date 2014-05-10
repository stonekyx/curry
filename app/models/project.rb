class Project < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :mid,
    :name,
    :created_at,
    :description
  ])

  define_data_fields(:WRITE_FIELD, [
    :id,
    :mid,
    :name,
    :created_at,
    :description
  ])

  #TODO: stone, UNICODE characters are not dealt with.
  def self.find_via_id id_list, options={}
    projects = []
    find_each(:select => get_data_fields(:WRITE_FIELD).to_a, :conditions => {:id => id_list}) do |item|
      item[:manager] = User.find_brief_info_via_id(item[:mid])
      item[:manager][:is_current_user] = (item[:mid] == options[:uid])
      item[:mid] = nil
      projects << item
    end

    projects
  end
end
