class VesselsController < ApplicationController

  def create
    @vessel = Vessel.new(vessel_params)
    if @vessel.save
      render json: @vessel
    else
      render json: @vessel.errors, status: :unprocessable_entity
    end
  end

  def index
    @vessel = Vessel.all
    render json: @vessel
  end

  def destroy
    vessel = Vessel.find(vessel_id)
    vessel.destroy
    render json: vessel
  end

  protected

  def vessel_params
    params.require(:vessel).permit(:identifier,
                                   :volume,
                                   :volume_unit,
                                   :vessel_type
    )
  end

  def vessel_id
    params.try(:vessel).try(:id) || params[:id]
  end

end
