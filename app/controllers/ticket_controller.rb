class TicketController < ApplicationController
  before_filter :post_only, :only => [:update]

  def index
    render 'layouts/base'
  end

  def browse
    # API TO BROWSE ALL TICKETS ABOUT CURRENT USER
  end

  def fire
    p "#### PARMAS ####"
    p params
    proj_hash = Project.check({:name => params[:project_name]})
    @errors = {:code => 'TICKET_FIRE', :message => {:key => 'project_name', :index => 2}} if proj_hash == -1
    return render_json_errors unless @errors.blank?

    rid = User.check({:first_name => params[:reporter]})
    @errors = {:code => 'TICKET_FIRE', :message => {:key => 'reporter', :index => 2}} if rid == -1
    return render_json_errors unless @errors.blank?

    aid = User.check({:first_name => params[:assignee]})
    @errors = {:code => 'TICKET_FIRE', :message => {:key => 'assignee', :index => 2}} if aid == -1
    return render_json_errors unless @errors.blank?

    fid = Version.check({:pid => proj_hash[:pid], :sprint => params[:fix_version]})
    @errors = {:code => 'TICKET_FIRE', :message => {:key => 'fix_version', :index => 2}} if fid == -1
    return render_json_errors unless @errors.blank?

    sub_params = {}
    sub_params[:pid] = proj_hash[:pid]
    sub_params[:name] = proj_hash[:name]
    sub_params[:title] = params[:project_title]
    sub_params[:genre] = params[:genre].to_i
    sub_params[:priority] = params[:priority].to_i
    sub_params[:rid] = rid
    sub_params[:aid] = aid
    sub_params[:fid] = fid
    sub_params[:description] = params[:description]

    ticket = Ticket.new sub_params
    Project.increase_cnt(proj_hash[:pid]) if ticket.save_itself

    render_json_success ({:ticket_id => ticket[:id]})
  end

  def fetch
    ticket = Ticket.find_via_id(params[:id])
    return render_json_errors unless [ticket[:rid], ticket[:aid]].include?(session[:user_id])

    attached_data = ticket.polish_data
    render_json_success_with_builder({:file => 'api/ticket_info', :data => {:ticket => ticket}.merge(attached_data)})
  end

  def update
    params[:priority] = params[:priority].to_i unless params[:priority].blank?
    params[:status] = params[:status].to_i unless params[:status].blank?

    ticket = Ticket.find(:first, :conditions => {:id => params[:id]})
    return render_json_errors unless [ticket[:rid], ticket[:aid]].include?(session[:user_id])

    if params[:assignee]
      aid = User.check({:first_name => params[:assignee]})
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
    params.delete(:assignee)
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
end
