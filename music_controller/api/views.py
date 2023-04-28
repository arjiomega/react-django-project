from django.shortcuts import render

# provides a set of reusable views that can be used to build API views in Django.
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room

from rest_framework.views import APIView
from rest_framework.response import Response # send custom response
# Create your views here.

class RoomView(generics.ListAPIView): # ListAPIView
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code' # pass a parameter in the url

    def get(self,request,format=None):
        code = request.GET.get(self.lookup_url_kwarg)

        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'},status=status.HTTP_404_NOT_FOUND)
        
        return Response({"Bad Request": "Code Parameter not found in request"},status=status.HTTP_400_BAD_REQUEST)

class CreateRoomView(APIView): # overwrite some default method
    serializer_class = CreateRoomSerializer

    def post(self,request,format=None):
        # check if user have current active session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            
            # if it exists, update
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            # if it does not exist, create new
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        # RoomSerializer(room).data -> get json formatted data 
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)