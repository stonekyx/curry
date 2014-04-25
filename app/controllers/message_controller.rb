class MessageController < ApplicationController
  before_filter :post_only, :only => [:route, :browse]

  def index
    render 'layouts/base'
  end

  def create
    @sender = User.find_via_email(params[:email_from])
    if @sender.blank?
      @errors = {:code => 'Message', :message => {:popup_error_slot => 'email_from_not_exist'}}
    elsif @sender.id != session[:user_id]
      @errors = {:code => 'Message', :message => {:popup_error_slot => 'email_from_not_match'}}
    end
    return render_json_errors unless @errors.blank?

    @receiver = User.find_via_email(params[:email_to])
    if @receiver.blank?
      @errors = {:code => 'Message', :message => {:popup_error_slot => 'email_to_not_exist'}}
    elsif params[:email_from] == params[:email_to]
      @errors = {:code => 'Message', :message => {:popup_error_slot => 'same_email'}}
    end
    return render_json_errors unless @errors.blank?

    params[:sid]  = @sender.id
    params[:rid]  = @receiver.id
    params[:genre] = params[:message_type].to_i
    params.delete(:email_from)
    params.delete(:email_to)
    params.delete(:message_type)

    sub_params = clean_params(params)
    @message = Message.new sub_params
    @message.save_itself ? render_json_success : render_json_errors
  end

  def browse
  end
end
