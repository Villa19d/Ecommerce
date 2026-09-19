from rest_framework import serializers
from .models import Review
from django.contrib.auth import get_user_model

User = get_user_model()

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.first_name', read_only=True)
    likes_count = serializers.SerializerMethodField()
    has_liked = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            'id', 'user_name', 'rating', 'comment', 
            'date_created', 'date_updated', 'parent', 
            'likes_count', 'has_liked', 'replies'
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_has_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_replies(self, obj):
        if obj.replies.exists():
            # Get only immediate children
            replies = obj.replies.all().order_by('date_created')
            return ReviewSerializer(replies, many=True, context=self.context).data
        return []
