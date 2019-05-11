class ScheduleProfilesController < ApplicationController

  def create
    @schedule_profile = ScheduleProfile.new(schedule_profile_params)
    if @schedule_profile.save
      render json: @schedule_profile
    else
      render json: @schedule_profile.errors, status: :unprocessable_entity
    end
  end

  def index
    @schedule_profile = ScheduleProfile.all
    render json: @schedule_profile
  end

  def show
    @schedule_profile = ScheduleProfile.find(schedule_profile_id)
    render json: @schedule_profile
  end

  def destroy
    schedule_profile = ScheduleProfile.find(schedule_profile_id)
    schedule_profile.destroy
    render json: schedule_profile
  end

  protected

  def schedule_profile_params
    params.require(:schedule_profile).permit(:name)
  end

  def schedule_profile_id
    params.try(:schedule_profile).try(:id) || params[:id]
  end

  def includes
    { mash_tasks: action_name == 'show',
      ferment_tasks: action_name == 'show',
      packaging_tasks: action_name == 'show'
    }
  end
end
