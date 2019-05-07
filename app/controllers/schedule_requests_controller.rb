class ScheduleRequestsController < ApplicationController

  def index
    if params[:scheduled].present? && params[:scheduled] == "true"
      @schedule_requests == ScheduleRequest.all.scheduled
    end
    if params[:scheduled].present? && params[:scheduled] == "false"
      @schedule_requests == ScheduleRequest.all.unscheduled
    end
    render json: @schedule_requests ||= ScheduleRequest.all.order('requested_preferred_date ASC')
  end

  def create
    @schedule_request = ScheduleRequest.new(schedule_request_params)
    if @schedule_request.save
      render json: @schedule_request
    else
      render json: @schedule_request.errors, status: :unprocessable_entity
    end
  end

  def update
    schedule_request = ScheduleRequest.find(schedule_request_id)
    schedule_request.update_attributes(schedule_request_params)
    render json: schedule_request
  end

  def bulk_update
    @schedule = []
    if params[:schedule_request].present?
      resources = Array(params[:schedule_request])
      resources.each do |resource|
        schedule = ScheduleRequest.find_or_initialize_by(identifier: resource[:groupName])
        schedule.update_attributes(update_request_params(resource))
        @schedule.append(schedule)
      end
    end
    render json: @schedule ||= ScheduleRequest.all.order('requested_preferred_date ASC')
  end



  private

  def schedule_request_params
    params.require(:schedule_request).permit(:product_name,
                                             :requested_preferred_date,
                                             :run_quantity,
                                             :end_type,
                                             :notes,
                                             :status,
                                             :scheduled,
                                             :start,
                                             :end,
                                             :scheduled_tasks => {},)
  end

  def update_request_params(resource)
    resource.permit(:start, :end, :vessel_id)
  end

  def schedule_request_id
    params[:schedule_request][:id] || params[:id]
  end
end
