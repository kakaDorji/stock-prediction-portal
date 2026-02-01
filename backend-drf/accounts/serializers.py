from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # we should not get the password using get righre
    password=serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})
    class Meta:
        model=User
        fields=['username','email','password']
# it will automatically validate the data =validate
    def create(self, validated_data):
        # pass all the validated data into it i mean create fucntion=**
        # create_user=automatically hashed password where are create() we need to hashed password later
        user=User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user