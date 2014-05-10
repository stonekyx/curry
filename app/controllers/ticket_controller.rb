class TicketController < ApplicationController
  before_filter :post_only, :only => [:update]

  def index
    render 'layouts/base'
  end

  def browse
    # API TO BROWSE ALL TICKETS ABOUT CURRENT USER
  end

  def update
    ticket = Ticket.find(:first, :conditions => {:id => params[:id]})
    return render_json_errors unless [ticket[:rid], ticket[:aid]].include?(session[:user_id])

    if params[:assignee_name]
      aid = User.check({:first_name => params[:assignee_name]})
      @errors = {:code => 'TICKET_UPDATE', :message => {:key => 'assignee', :index => 2}} if aid == -1
      return render_json_errors unless @errors.blank?

      params[:aid] = aid
    end

    if params[:pid] && params[:fix_version]
      fid = Version.check({:pid => params[:pid], :sprint => params[:fix_version]})
      @errors = {:code => 'TICKET_UPDATE', :message => {:key => 'fix_version', :index => 2}} if fid == -1
      return render_json_errors unless @errors.blank?

      params[:fid] = fid
    end

    params.delete(:id)
    params.delete(:assignee_name)
    params.delete(:pid)
    params.delete(:fix_version)

    Ticket.get_data_fields(:READ_FIELD).each do |key|
      ticket[key] = params[key] unless params[key].blank?
    end

    ticket.save_itself ? render_json_success : render_json_errors
  end

  def add_comment
    @errors = {:code => 'TICKET_ADD_COMMENT', :message => {:key => 'comment', :index => 2}} if session[:user_id].blank?
    return render_json_errors unless @errors.blank?

    sub_params = {}
    sub_params[:uid] = session[:user_id]
    sub_params[:content] = params[:comment]
    comment = Comment.new sub_params
    @errors = {:code => 'TICKET_ADD_COMMENT', :message => {:popup_error_slot => 'backend_error'}} unless comment.save_itself

    sub_params = {}
    sub_params[:tid] = params[:id]
    sub_params[:cid] = comment[:id]
    relation = Relation::TC.new sub_params
    @errors = {:code => 'TICKET_ADD_COMMENT', :message => {:popup_error_slot => 'backend_error'}} unless relation.save_itself

    @errors.blank? ? render_json_success : render_json_errors
  end

  def fetch
    ticket = Ticket.find_via_id(params[:id])
    return render_json_errors unless [ticket[:rid], ticket[:aid]].include?(session[:user_id])

    attached_data = ticket.polish_data
    render_json_success_with_builder({:file => 'api/ticket_info', :data => {:ticket => ticket}.merge(attached_data)})
  end
end
