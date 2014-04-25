module ParamsAction
  def clean_params params
    raw_hash = {}
    klass = Object.const_get params[:controller].capitalize
    valid_fields = klass.get_data_fields(:WRITE_FIELD)
    valid_fields.each do |key|
      raw_hash[key] = params[key] unless params[key].blank?
    end

    raw_hash
  end
end
