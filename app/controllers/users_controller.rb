class UsersController < ApplicationController
  include UserAction
  before_filter :post_only, :only => [:signup, :login, :logout]

  def index
    render 'layouts/base'
  end

  def signup
    sub_params = clean_params(params)
    @user = User.new sub_params
    @user.save_myself ? render_json_success : render_json_errors
  end

  def login
    action_user = User.find_via_email(params[:email])
    return render_json_errors if action_user.blank? || !action_user.authenticate(params[:password])

    set_cookie_by_key('CURRY_UID', action_user.id)
    set_cookie_by_key('CURRY_UNAME', action_user.first_name)

    render_json_success
  end

  def logout
  end
end
