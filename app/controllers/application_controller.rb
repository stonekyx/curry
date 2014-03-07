class ApplicationController < ActionController::Base
  #protect_from_forgery
  include Authentication

  def post_only
    return head(403) unless request.post?
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
