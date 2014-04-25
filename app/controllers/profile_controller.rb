class ProfileController < ApplicationController
  before_filter :prepare_user, :only => [:user_info]

  def user_info
    #TODO: zanwen, need to regular the response of user maybe by jsonbuilder file.
    render_json_success ({:user => @user})
  end

  def prepare_user
    #TODO: zanwen, need refresh @user when needed
    @user = User.find_via_id(session[:user_id])
  end
end
