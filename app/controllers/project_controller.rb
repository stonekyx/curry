class ProjectController < ApplicationController
  before_filter :post_only, :only => [:update]

  def index
    render 'layouts/base'
  end

  #TODO: stone, there must be a better way to unify coding.
  #proj.name.force_encoding('UTF-8')
  #proj.description.force_encoding('UTF-8')

  def browse
    pid_list = Relation::PU.where(:uid => session[:user_id]).pluck(:pid).uniq
    projects = Project.find_via_id(pid_list, {:uid => session[:user_id]})
    render_json_success ({:list => projects})
  end

  def update
    project = Project.find(:first, :conditions => {:id => params[:id]})
    params.delete(:id)

    Project.get_data_fields(:WRITE_FIELD).each do |key|
      project[key] = params[key] unless params[key].blank?
    end

    project.save_itself ? render_json_success : render_json_errors
  end

  def fetch
    project = Project.find_via_id(params[:id], {:uid => session[:user_id]})
    render_json_success ({:item => project.first})
  end

  def ticket_list
    tickets = Ticket.find_brief_info_via_paid(params[:id], session[:user_id])
    render_json_success ({:list => tickets})
  end
end
