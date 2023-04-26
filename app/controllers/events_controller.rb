class EventsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :authorized, only: [:create, :update, :destroy]

  def index
    events = Event.all
    render json: events
  end

  def show
    event = Event.find(params[:id])
    render json: event
  end

  def create
    user = User.find(session[:user_id])
    event = user.events.build(event_params)

    if event.save
      render json: event, status: :created
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])

    if event.user_id == session[:user_id]
      if event.update(event_params)
        render json: event, status: :ok
      else
        render json: event.errors, status: :unprocessable_entity
      end
    else
      render json: { errors: "You can only edit your own events." }, status: :forbidden
    end
  end

  def destroy
    event = Event.find(params[:id])

    if event.user_id == session[:user_id]
      event.destroy
      render json: { message: 'Event was successfully destroyed.' }, status: :ok
    else
      render json: { errors: "You can only delete your own events." }, status: :forbidden
    end
  end

  private
  def event_params
    params.require(:event).permit(:name, :description, :location, :start_time, :end_time, :latitude, :longitude, :interest_id, :image_url)
  end

  def render_not_found
    render json: { error: "Event not found" }, status: :not_found
  end

  def authorized
    return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
  end
    
  end
  