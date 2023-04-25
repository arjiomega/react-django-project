# Turn models into Json Response

from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # set primary_key = id
        fields = ('id','code','host','guest_can_pause','votes_to_skip')