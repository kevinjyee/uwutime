class ScheduleRequestsController < ApplicationController
  def index
    @schedule_requests = ScheduleRequest.order('requested_preferred_date ASC')
    @schedule_request = ScheduleRequest.new
  end

  def create
    @schedule_request = ScheduleRequest.create!(schedule_request_params)
    @schedule_requests = ScheduleRequest.order('requested_preferred_date ASC')
  end

  private

  def schedule_request_params
    params.require(:schedule_request).permit(:product_name, :requested_preferred_date)
  end
end
