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

  private

  def schedule_request_params
    params.require(:schedule_request).permit(:product_name,
                                             :requested_preferred_date,
                                             :run_quantity,
                                             :scheduled_tasks,
                                             :end_type,
                                             :notes,
                                             :status,
                                             :scheduled)
  end
end
