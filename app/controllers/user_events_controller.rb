class UserEventsController < ApplicationController
    before_action :authorized, only: [:create, :destroy]

    def create
      user_event = UserEvent.new(user_event_params)
      user_event.user_id = session[:user_id]
  
      if user_event.save
        render json: user_event, status: :created
      else
        render json: user_event.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      user_event = UserEvent.find_by(user_id: session[:user_id], event_id: params[:event_id])
  
      if user_event
        user_event.destroy
        render json: { message: 'User event association was successfully destroyed.' }, status: :ok
      else
        render json: { errors: "User event association not found or you're not authorized to delete it." }, status: :forbidden
      end
    end
  
    private
    def user_event_params
      params.require(:user_event).permit(:event_id)
    end
  
    def authorized
      return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
