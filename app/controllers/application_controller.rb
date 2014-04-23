class ApplicationController < ActionController::Base
  #protect_from_forgery
  include Authentication

  before_filter :set_locale
  before_filter :prepare_cookies

  def prepare_cookies
    cookies = self.request.cookie_jar || {}
  end

  def set_locale
    I18n.locale = SITE_LOCALE || I18n.default_locale
  end

  def post_only
    return head(403) unless request.post?
  end

  def set_cookie_by_key(key, value)
    return false if value.blank?

    config = Cookies.get_config_by_key(key).dup
    cookie = {:value => value.to_s, :path => config[:path], :httponly => config[:httponly]}

    cookie[:expires_in] = Time.now + config[:expires_in]
    cookie[:secure] =  true if config[:secure] && request.ssl?
    cookie[:domain] = COOKIE_DOMAIN if config[:use_domain]

    cookies[config[:name]] = cookie

    return true
  end

  def get_cookie_by_key(key)
    config = Cookie.get_config_by_key(key).dup
    cookies[config[:name]]
  end

  def render_json_errors
    @errors ||= {}
    render :json => {
      :fail => params[:controller]+'#'+params[:action]
    }.merge!({:errors => @errors}).to_json
  end

  def render_json_success data={}
    render :json => {
      :success => params[:controller]+'#'+params[:action]
    }.merge!(data).to_json
  end
end
