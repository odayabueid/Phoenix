from django.db import models
from django.contrib.auth.models import User

    

class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100,default='SOME STRING',unique=True)
    email = models.CharField(max_length=100,default='SOME STRING',unique=True)
    password = models.CharField(max_length=100,default='SOME STRING')
    url = models.TextField (max_length=21845,default='SOME STRING')
    bio = models.CharField(max_length=200,default='SOME STRING')
    # owner = models.ForeignKey(
    #     User , related_name="myapp", on_delete = models.CASCADE ,null = True)


class Hotels(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,default='SOME STRING')
    country = models.CharField(max_length = 100,default='SOME STRING')
    phone = models.CharField(max_length=50,default='SOME STRING')
    image = models.CharField(max_length=500,default='SOME STRING')
    rating = models.CharField(max_length=200,default='SOME STRING')
    price = models.CharField(max_length=200,default='SOME STRING')
    desc = models.CharField(max_length=500,default='SOME STRING')
    link = models.CharField(max_length=900,default='SOME STRING')



class Blogs(models.Model):
    ProfileId = models.ForeignKey(
        'Profile',
        on_delete=models.CASCADE,
        
    )
    title = models.CharField(max_length=100,default='SOME STRING')
    country = models.CharField(max_length=100,default='SOME STRING')
    Blog = models.TextField(blank=True,default='SOME STRING')
    image = models.CharField(max_length=500,default='SOME STRING')

class List(models.Model):
    id = models.AutoField(primary_key=True)
    userId= models.ForeignKey(
        'Profile',
        on_delete=models.CASCADE, 
    )
    text = models.CharField(max_length=200)
    done = models.BooleanField(default=False) 

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    userId= models.ForeignKey(
        'Profile',
        on_delete=models.CASCADE, 
    )
    comment = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)