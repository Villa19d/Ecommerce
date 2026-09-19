from datetime import datetime
from product.models import Product
from django.db import models

from django.conf import settings
User = settings.AUTH_USER_MODEL


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    comment = models.TextField()
    date_created = models.DateTimeField(default=datetime.now)
    date_updated = models.DateTimeField(auto_now=True)
    
    # Sistema de respuestas (YouTube style)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    
    # Sistema de likes
    likes = models.ManyToManyField(User, related_name='review_likes', blank=True)

    def __str__(self):
        return self.comment