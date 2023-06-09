from django.db import models
import string
import random

# Create your models here.

def generate_unique_code():
    """
    generate random code until we generate unique code that does not exist in Room
    """
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))

        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    # whenever we create a new room we generate code using the function
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False,default=False)
    votes_to_skip = models.IntegerField(null=False,default=1)
    created_at = models.DateTimeField(auto_now_add=True)


