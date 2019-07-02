from pheonixapp.models import Profile
from pheonixapp.models import Blogs
from pheonixapp.models import Hotels
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .serializers import postSerializer
from .serializers import BlogsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import SignupSerializer 
from .serializers import SigninSerializer
from .serializers import HotelsSerializer
from rest_framework import permissions
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer

# class postViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = postSerializer

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
    def get_queryset(self):
        return self.request.user.all()

    def perform_create(self , serializer):
        serializer.save(owner = self.request.user)

# class SignUp(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = UserSerializer





class SignIn(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = postSerializer






class SignupAPI(generics.GenericAPIView):
    serializer_class = SignupSerializer
    def post(self , request , *args , **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user" : UserSerializer(user,context= self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
            })

# class SigninAPI(generics.GenericAPIView):       
#     serializer_class = SigninSerializer
    
#     def post(self , request , *args , **kwargs):
#         serializer = self.get_serializer(data = request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response({
#             "user" : UserSerializer(user,context= self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)[1]
#             })

class SigninAPI(generics.GenericAPIView):
    serializer_class = SigninSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data =request.data)
        print ("\n\n\nInj Signin API, Serializer:", serializer, "\n\n\n\n")
        
        serializer.is_valid(raise_exception=True)
        print ("\n\n\nAfter is valid \n\n\n")
        user = serializer.validated_data
        print(user, "hi")
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
            })


# class SigninAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)
#         return super(LoginView, self).post(request, format=None)

# check the token
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
            

class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BlogsSerializer


class HotelsViewSet(viewsets.ModelViewSet):
    queryset = Hotels.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HotelsSerializer