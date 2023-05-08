class EventsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :authorized, only: [:create, :update, :destroy]

  def index
    events = Event.all
    puts "Events count: #{events.count}"
    render json: events, include: :reviews
  end

  def show
    event = Event.find(params[:id])
    render json: event, include: :reviews
  end

  def create
    user = User.find(session[:user_id])
    event = Event.new(event_params)
    event.user_id = user.id
  
    if event.save
      render json: event, status: :created
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end
  
  def update
    event = Event.find(params[:id])
  
    if event.user_id != session[:user_id]
      event.user_id = session[:user_id]
      event.save
    end
  
    if event.update(event_params)
      render json: event
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  
  def destroy
    event = Event.find(params[:id])
  
    puts "Event: #{event.inspect}" # Add this line
  
    if event.user_id == session[:user_id]
      event.destroy
      render json: { message: 'Event was successfully destroyed.' }, status: :ok
    else
      puts "Event User ID: #{event.user_id}"
      puts "Session User ID: #{session[:user_id]}"
      render json: { errors: "You can only delete your own events." }, status: :forbidden
    end
  end
  

  private
  def event_params
    params.require(:event).permit(:name, :description, :location, :start_time, :end_time, :latitude, :longitude, :image_url)
  end

  def render_not_found
    render json: { error: "Event not found" }, status: :not_found
  end

  def authorized
    return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
  end
    
  end
  