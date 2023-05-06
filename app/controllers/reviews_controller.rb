class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :authorized, only: [:edit, :update, :destroy]

  def index
    reviews = Review.all
    render json: reviews.as_json(methods: :username)
  end

  def show
    review = Review.find(params[:id])
    render json: review.as_json(methods: :username)
  end

  def create
    event = Event.find(params[:event_id])
    review = event.reviews.new(review_params)
    review.user = User.find(session[:user_id])

    if review.save
        render json: review.as_json(methods: :username), status: :created
    else
      render json: review.errors, status: :unprocessable_entity
    end
  end

  def update
    review = Review.find(params[:id])
    if review.user_id == session[:user_id]
      review.update(review_params)
      render json: review.as_json(methods: :username), status: :ok
    else
      render json: { errors: "You can only edit your own reviews." }, status: :forbidden
    end
  end

  def destroy
    review = Review.find(params[:id])
    if review.user_id == session[:user_id]
      review.destroy
      render json: { message: 'Review was successfully destroyed.' }, status: :ok
    else
      render json: { errors: "You can only delete your own reviews." }, status: :forbidden
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :comment)
  end

  def render_not_found
    render json: { error: "Review not found" }, status: :not_found
  end

  def authorized
    return render json: {errors: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
  end
end
