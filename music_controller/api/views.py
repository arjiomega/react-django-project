from django.shortcuts import render

# provides a set of reusable views that can be used to build API views in Django.
from rest_framework import generics 
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

class RoomView(generics.CreateAPIView): # ListAPIView
    queryset = Room.objects.all()
    serializer_class = RoomSerializer