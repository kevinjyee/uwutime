class ScheduleRequestsController < ApplicationController
  def index
    @schedule_requests = ScheduleRequest.order('requested_preferred_date ASC')
    @schedule_request = ScheduleRequest.new
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
    params.require(:schedule_request).permit(:product_name, :requested_preferred_date)
  end
end
