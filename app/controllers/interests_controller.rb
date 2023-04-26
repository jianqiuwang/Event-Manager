class InterestsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    before_action :authorized, only: [:create, :update, :destroy]
  
    def index
      interests = Interest.all
      render json: interests
    end
  
    def show
      interest = Interest.find(params[:id])
      render json: interest
    end
  
    def create
      user = User.find(session[:user_id])
      interest = Interest.new(interest_params)
  
      if interest.save
        render json: interest, status: :created
      else
        render json: interest.errors, status: :unprocessable_entity
      end
    end
  
    def update
      interest = Interest.find(params[:id])
  
      if interest.update(interest_params)
        render json: interest, status: :ok
      else
        render json: interest.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      interest = Interest.find(params[:id])
      interest.destroy
      render json: { message: 'Interest was successfully destroyed.' }, status: :ok
    end
  
    private
  
    def interest_params
      params.require(:interest).permit(:name)
    end
  
    def render_not_found
      render json: { error: "Interest not found" }, status: :not_found
    end
  
    def authorized
      return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
