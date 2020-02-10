class Api::TracksController < ApplicationController

  def index
    @tracks = Track.all
    # render "api/tracks/index"
    render :show
  end

  def create
    @track = current_user.tracks.new(track_params)
    # @track = Track.new(track_params)
    if @track.save
      render "api/tracks/show"
      # render :show
    else
      render json: @track.errors.full_messages, status: 401
    end
  end

  def show
    @track = Track.find(params[:id])
    render "api/tracks/show"
    # render :show
  end

  def update
    @track = Track.find(params[:id])
    if @track.update(track_params)
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 401
    end
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render json: {}
  end

  private
  def track_params
    params.require(:track).permit(:title, :artist, :user_id)
  end

end