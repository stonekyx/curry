module UserAction
  def clean_params user_params
    raw_hash = {}
    valid_fields = User.get_data_fields(:WRITE_FIELD)
    valid_fields.each do |key|
      raw_hash[key] = user_params[key] unless user_params[key].blank?
    end

    raw_hash
  end
end
