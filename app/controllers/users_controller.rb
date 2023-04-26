class UsersController < ApplicationController
    before_action :authorized, only: [:show]
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        current_user = User.find_by(id: session[:user_id])
        render json: current_user
    end
    
    private
    
    def user_params
        params.permit(:username, :password)
    end

    def authorized
        return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
