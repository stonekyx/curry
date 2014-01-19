class ApplicationController < ActionController::Base
  before_filter :render_frame
  #protect_from_forgery

  def render_frame
    #return render "home/frame"
  end
end
