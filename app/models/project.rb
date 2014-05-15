class Project < Dove::Base
  define_data_fields(:READ_FIELD, [
    :id,
    :name,
    :abbr,
    :cnt,
    :mid,
    :created_at,
    :description
  ])

  define_data_fields(:WRITE_FIELD, [
    :id,
    :name,
    :mid,
    :created_at,
    :description
  ])

  #TODO: stone, UNICODE characters are not dealt with.
  def self.find_via_id id_list, options={}
    projects = []
    find_each(:select => get_data_fields(:READ_FIELD).to_a, :conditions => {:id => id_list}) do |item|
      item[:manager] = User.find_brief_info_via_id(item[:mid])
      item[:manager][:is_current_user] = (item[:mid] == options[:uid])
      item[:mid] = nil
      projects << item
    end

    projects
  end

  def self.check options={}
    item = find(:all, :select => get_data_fields(:READ_FIELD).to_a, :conditions => options)

    #TODO: zacky, need to handle multi-users issue here.
    item.blank? ? -1 : {:pid => item.first[:id], :name => item.first[:abbr] + '-' + (item.first[:cnt]+1).to_s}
  end

  def self.increase_cnt id
    increment_counter :cnt, id
  end
end
