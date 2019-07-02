from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from pheonixapp.models import List
from pheonixapp.serializers import listSerializer
from django.shortcuts import get_object_or_404
from pheonixapp.models import Profile
from pheonixapp.serializers import putSerializer


class ListView (APIView):
  def get(self, request):
    todos= List.objects.all()
    serializer=listSerializer(todos, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer=listSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class detailListView(APIView):
  def get(self,request,pk):
    todo=get_object_or_404(List,pk=pk)
    serializer=listSerializer(todo)
    return Response(serializer.data)
  def delete(self,request,pk):
    todo=get_object_or_404(List,pk=pk)
    todo.delete()
    return Response('success')
  




class UpDateProfiledata(APIView):

    def put(self, request, pk):
        saved_profile = get_object_or_404(Profile.objects.all(), pk=pk)
        data = request.data.get('profile')
        serializer = putSerializer(instance=saved_profile, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            profile_saved = serializer.save()
        return Response({"success": "Profile '{}' updated successfully".format(profile_saved.bio)})