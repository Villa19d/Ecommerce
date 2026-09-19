from django.urls import path
from .views import (
    GetProductReviewsView,
    GetProductReviewView,
    CreateProductReviewView,
    UpdateProductReviewView,
    DeleteProductReviewView,
    FilterProductReviewsView,
    LikeReviewView,
    GetReviewRepliesView
)

urlpatterns = [
    path('get-reviews/<productId>', GetProductReviewsView.as_view()),
    path('get-replies/<reviewId>', GetReviewRepliesView.as_view()),
    path('get-review/<productId>', GetProductReviewView.as_view()),
    path('create-review/<productId>', CreateProductReviewView.as_view()),
    path('update-review/<reviewId>', UpdateProductReviewView.as_view()),
    path('delete-review/<reviewId>', DeleteProductReviewView.as_view()),
    path('filter-reviews/<productId>', FilterProductReviewsView.as_view()),
    path('like/<reviewId>', LikeReviewView.as_view()),
]