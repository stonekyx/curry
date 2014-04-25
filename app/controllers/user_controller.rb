class UserController < ApplicationController
  before_filter :post_only, :only => [:signup, :login, :logout]

  def index
    render 'layouts/base'
  end

  def signup
    sub_params = clean_params(params)
    @user = User.new sub_params
    @user.save_itself ? render_json_success : render_json_errors
  end

  def login
    @user = User.find_via_email(params[:email])
    return render_json_errors if @user.blank? || !@user.authenticate(params[:password])

    store_user
    render_json_success
  end

  def logout
    #TODO: zacky, need to authenticate user by cookie.
    clear_user
    render_json_success
  end
end
