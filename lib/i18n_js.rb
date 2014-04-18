class I18nJs
  def self.get_translations
    ::I18n.backend.instance_eval do
      init_translations unless initialized?
      { SITE_LOCALE => translations[SITE_LOCALE.to_sym][:js] || {} }
    end.to_json
  end
end
