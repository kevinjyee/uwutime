class FermentablesController < ApplicationController

  def index
    @fermentables = fermentables
    render json: @fermentables
  end

  def fermentables
    Fermentable.query(term)
  end

  def term
    params[:q]
  end
end
