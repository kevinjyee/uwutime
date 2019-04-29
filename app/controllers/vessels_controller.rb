class VesselsController < ApplicationController
  def index
    @vessel = Vessel.all
    render json: @vessel
  end

  protected

end
