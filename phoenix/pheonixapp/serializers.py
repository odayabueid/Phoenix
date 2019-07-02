from rest_framework import serializers
from pheonixapp.models import Profile
from pheonixapp.models import Blogs
from django.contrib.auth.models import User
from pheonixapp.models import Hotels
from django.contrib.auth import authenticate
from pheonixapp.models import List
from pheonixapp.models import Comments

class listSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields='__all__'

class putSerializer(serializers.Serializer):
    url = serializers.CharField (max_length=21845,default='SOME STRING')
    bio = serializers.CharField(max_length=200,default='SOME STRING')


    def update(self, instance, validated_data):
        instance.url = validated_data.get('url', instance.url)
        instance.bio = validated_data.get('bio', instance.bio)

        instance.save()
        return instance




class postSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id" , "username" ,"email" , "password" )
        extra_kwargs = {'password':{'write_only':True}}

    def create(self , validated_data):
        print(validated_data["password"])
        user = User.objects.create_user(
        validated_data["username"],validated_data["email"],
        validated_data["password"] 
        )
        return user

# class SigninSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()
#     def validate(self,data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         # raise serializers.ValidationError("ERORR")


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self,data):
        print(data["username"] ,data["password"] )        
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class HotelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotels
        fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'




