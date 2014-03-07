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
    User.authenticate(params[:email], params[:password]) ? render_json_success : render_json_errors
  end

  def logout
  end
end
