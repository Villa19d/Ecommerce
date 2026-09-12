from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework import permissions

# Create your views here.

from .models import Category

class ListCategoriesView(APIView):
  permission_classes = (permissions.AllowAny, )

  def get(self, request, format=None):
    if Category.objects.all().exists():
      categories = Category.objects.all()
      result = []

      for category in categories:
        if not category.parent:
          item ={}
          item['id']= category.id
          item['name'] = category.name

          item['sub_categories'] = []
          for cate in categories:
            sub_item = {}
            if cate.parent and cate.parent.id == category.id:
               sub_item['id'] = cate.id
               sub_item['name'] = cate.name
               sub_item['sub_categories'] = []
               item['sub_categories'].append(sub_item)
          result.append(item)   
      return Response({'categories':result}, status = status.HTTP_200_OK) 
    else:
      return Response({'error':'No categories found'}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)