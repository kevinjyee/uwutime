class FermentablesController < ApplicationController

  def index
    @fermentables = fermentables
    render json: @fermentables
  end

  def fermentables
    Fermentable.query(term, search_by_prefix)
  end

  def term
    params[:q]
  end

  def search_by_prefix
    @_search_by_prefix = params[:search_by_prefix] || false
  end
end

