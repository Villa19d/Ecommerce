from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from product.models import Product
from .models import Review
from .serializers import ReviewSerializer
from django.db.models import Count

class GetProductReviewsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)
            
            # Paginacion y filtros
            sort_by = request.query_params.get('sort', 'recent') # recent o top
            page = int(request.query_params.get('page', 1))
            limit = 10
            offset = (page - 1) * limit

            # Solo traer comentarios padre (no respuestas)
            reviews_qs = Review.objects.filter(product=product, parent__isnull=True)

            if sort_by == 'top':
                reviews_qs = reviews_qs.annotate(like_count=Count('likes')).order_by('-like_count', '-date_created')
            else:
                reviews_qs = reviews_qs.order_by('-date_created')
                
            total_reviews = reviews_qs.count()
            reviews_qs = reviews_qs[offset:offset+limit]

            # Pasar el request al serializer para evaluar 'has_liked'
            serializer = ReviewSerializer(reviews_qs, many=True, context={'request': request})
            
            return Response(
                {
                    'reviews': serializer.data,
                    'total_reviews': total_reviews,
                    'has_more': (offset + limit) < total_reviews
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Something went wrong when retrieving reviews: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetReviewRepliesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, reviewId, format=None):
        try:
            review_id = int(reviewId)
        except:
            return Response({'error': 'Review ID must be an integer'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            if not Review.objects.filter(id=review_id).exists():
                return Response({'error': 'This review does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            parent_review = Review.objects.get(id=review_id)
            
            # Paginacion
            page = int(request.query_params.get('page', 1))
            limit = 10
            offset = (page - 1) * limit

            replies_qs = Review.objects.filter(parent=parent_review).order_by('date_created')
                
            total_replies = replies_qs.count()
            replies_qs = replies_qs[offset:offset+limit]

            serializer = ReviewSerializer(replies_qs, many=True, context={'request': request})
            
            return Response(
                {
                    'replies': serializer.data,
                    'total_replies': total_replies,
                    'has_more': (offset + limit) < total_replies
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Something went wrong when retrieving replies: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    

class GetProductReviewView(APIView):
    def get(self, request, productId, format=None):
        user = self.request.user
        
        if not user.is_authenticated:
            return Response({'review': {}}, status=status.HTTP_200_OK)

        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            product = Product.objects.get(id=product_id)

            result = {}

            review_qs = Review.objects.select_related('user').filter(user=user, product=product, parent__isnull=True)
            if review_qs.exists():
                review = review_qs.first()
                serializer = ReviewSerializer(review, context={'request': request})
                result = serializer.data

            return Response(
                {'review': result},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Something went wrong when retrieving review: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateProductReviewView(APIView):
    def post(self, request, productId, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(productId)
        except:
            return Response({'error': 'Product ID must be an integer'}, status=status.HTTP_404_NOT_FOUND)

        if not Product.objects.filter(id=product_id).exists():
            return Response({'error': 'This Product does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
        product = Product.objects.get(id=product_id)

        try:
            rating = data.get('rating')
            if rating is not None and rating != '':
                rating = float(rating)
            else:
                rating = None
                
            comment = str(data.get('comment', ''))
            parent_id = data.get('parent_id')
            
            if not comment:
                return Response({'error': 'Must pass a comment when creating review'}, status=status.HTTP_400_BAD_REQUEST)

            parent_review = None
            if parent_id:
                try:
                    parent_review = Review.objects.get(id=int(parent_id), product=product)
                    # Flatten 2nd level replies
                    if parent_review.parent is not None:
                        parent_review = parent_review.parent
                except Review.DoesNotExist:
                    return Response({'error': 'Parent review does not exist'}, status=status.HTTP_404_NOT_FOUND)

            review = Review.objects.create(
                user=user,
                product=product,
                rating=rating,
                comment=comment,
                parent=parent_review
            )

            serializer = ReviewSerializer(review, context={'request': request})
            return Response(
                {'review': serializer.data},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Something went wrong when creating review: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateProductReviewView(APIView):
    def put(self, request, reviewId, format=None):
        user = self.request.user
        data = self.request.data

        try:
            review_id = int(reviewId)
        except:
            return Response({'error': 'Review ID must be an integer'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            rating = data.get('rating')
            if rating is not None and rating != '':
                rating = float(rating)
            else:
                rating = None
        except:
            return Response({'error': 'Rating must be a decimal value'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            comment = str(data['comment'])
            if not comment:
                raise ValueError()
        except:
            return Response({'error': 'Must pass a comment when updating review'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            try:
                review = Review.objects.get(id=review_id)
            except Review.DoesNotExist:
                return Response({'error': 'Review does not exist'}, status=status.HTTP_404_NOT_FOUND)

            if review.user != user:
                return Response({'error': 'You can only update your own reviews'}, status=status.HTTP_403_FORBIDDEN)

            review.rating = rating
            review.comment = comment
            review.save()

            serializer = ReviewSerializer(review, context={'request': request})

            return Response(
                {'review': serializer.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating review'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class DeleteProductReviewView(APIView):
    def delete(self, request, reviewId, format=None):
        user = self.request.user

        try:
            review_id = int(reviewId)
        except:
            return Response({'error': 'Review ID must be an integer'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            try:
                review = Review.objects.get(id=review_id)
            except Review.DoesNotExist:
                return Response({'error': 'Review does not exist'}, status=status.HTTP_404_NOT_FOUND)

            if review.user != user:
                return Response({'error': 'You can only delete your own reviews'}, status=status.HTTP_403_FORBIDDEN)

            review.delete()

            return Response(
                {'success': 'Review deleted successfully'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when deleting product review'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class FilterProductReviewsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        if not Product.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'This product does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        product = Product.objects.get(id=product_id)

        rating = request.query_params.get('rating')

        try:
            rating = float(rating)
        except:
            return Response(
                {'error': 'Rating must be a decimal value'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            if not rating:
                rating = 5.0
            elif rating > 5.0:
                rating = 5.0
            elif rating < 0.5:
                rating = 0.5

            results = []

            if Review.objects.filter(product=product).exists():
                if rating == 0.5:
                    reviews = Review.objects.select_related('user').order_by('-date_created').filter(
                        rating=rating, product=product
                    )
                else:
                    reviews = Review.objects.select_related('user').order_by('-date_created').filter(
                        rating__lte=rating,
                        product=product
                    ).filter(
                        rating__gte=(rating - 0.5),
                        product=product
                    )

                for review in reviews:
                    item = {}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)

            return Response(
                {'reviews': results},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when filtering reviews for product'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LikeReviewView(APIView):
    def post(self, request, reviewId, format=None):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'error': 'Must be authenticated to like a review'}, status=status.HTTP_401_UNAUTHORIZED)
            
        try:
            review_id = int(reviewId)
            review = Review.objects.get(id=review_id)
            
            if review.likes.filter(id=user.id).exists():
                review.likes.remove(user)
                liked = False
            else:
                review.likes.add(user)
                liked = True
                
            return Response({'liked': liked, 'likes_count': review.likes.count()}, status=status.HTTP_200_OK)
            
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)