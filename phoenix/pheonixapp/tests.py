from django.test import TestCase
import unittest
from pheonixapp.models import Profile
from pheonixapp.models import Blogs
from pheonixapp.models import Hotels
from pheonixapp.models import List
from pheonixapp.models import User
from django.urls import reverse
from django.test import Client
from rest_framework.test import APIRequestFactory
from phoenix.urls import ListView
from rest_framework.test import force_authenticate
from django.test.client import RequestFactory




class ProfileTestCase(TestCase):
    def setUp(self):
        Profile.objects.create(username="areej" , email="areej@yahoo.com",password="areej",bio="my name is areejAli",url="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")

    def test_profiles_have_username(self):
        areej = Profile.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.username, "areej")
    def test_profiles_have_email(self):
        areej = Profile.objects.get(username="areej")
        self.assertEqual(areej.email,"areej@yahoo.com")
    def test_profiles_have_password(self):
        areej = Profile.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.password, "areej")
    def test_profiles_have_bio(self):
        areej = Profile.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.bio,"my name is areejAli")
    def test_profiles_have_url(self):
        areej = Profile.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.url,"https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
    


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="areej" , email="areej@yahoo.com",password="areej")


    def test_profiles_have_username(self):
        areej = User.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.username, "areej")
    def test_profiles_have_email(self):
        areej = User.objects.get(username="areej")
        self.assertEqual(areej.email,"areej@yahoo.com")
    def test_profiles_have_password(self):
        areej = User.objects.get(email="areej@yahoo.com")
        self.assertEqual(areej.password, "areej")
   
    

class HotelsTestCase(TestCase):
    def setUp(self):
        Hotels.objects.create(name="sheraton" ,country="amman",phone="(06) 593 4111",image="https://ntmresizer.azureedge.net/sized/358/284/www.cfmedia.vfmleonardo.com/imageRepo/6/0/100/1/34/ammsi-exterior-3061-hor-clsc_S.jpg",rating="5 stars",price="100 jd" , desc="any thing" , link="https://www.facebook.com/sheratonamman/")

    def test_Hotels_have_name(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.name, "sheraton")
    def test_Hotels_have_country(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.country, "amman")
    def test_Hotels_have_phone(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.phone,"(06) 593 4111")
    def test_Hotels_have_image(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.image,"https://ntmresizer.azureedge.net/sized/358/284/www.cfmedia.vfmleonardo.com/imageRepo/6/0/100/1/34/ammsi-exterior-3061-hor-clsc_S.jpg")
    def test_Hotels_have_rating(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.rating,"5 stars")
    def test_Hotels_have_price(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.price,"100 jd")
    def test_Hotels_have_desc(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.desc,"any thing")
    def test_Hotels_have_link(self):
        sheraton = Hotels.objects.get(name="sheraton")
        self.assertEqual(sheraton.link,"https://www.facebook.com/sheratonamman/")







class BlogsTestCase(TestCase):
    def setUp(self):
        user =  Profile.objects.create(username="areej" , email="areej@yahoo.com",password="areej",bio="my name is areejAli",url="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
        Blogs.objects.create(ProfileId = user ,title="any thing" ,country="amman",Blog="my blog",image="https://ntmresizer.azureedge.net/sized/358/284/www.cfmedia.vfmleonardo.com/imageRepo/6/0/100/1/34/ammsi-exterior-3061-hor-clsc_S.jpg")

    def test_Blogs_have_name(self):
        Blog = Blogs.objects.get(title="any thing")
        self.assertEqual(Blog.title, "any thing")
    def test_Blogs_have_country(self):
        Blog = Blogs.objects.get(title="any thing")
        self.assertEqual(Blog.country, "amman")
    def test_Blogs_have_phone(self):
        Blog = Blogs.objects.get(title="any thing")
        self.assertEqual(Blog.Blog,"my blog")
    def test_Blogs_have_phone(self):
        Blog = Blogs.objects.get(title="any thing")
        self.assertEqual(Blog.image,"https://ntmresizer.azureedge.net/sized/358/284/www.cfmedia.vfmleonardo.com/imageRepo/6/0/100/1/34/ammsi-exterior-3061-hor-clsc_S.jpg")
    




class ListTestCase(TestCase):
    def setUp(self):
        user =  Profile.objects.create(username="areej" , email="areej@yahoo.com",password="areej",bio="my name is areejAli",url="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
        List.objects.create(userId=user,text="any thing",done=True)
       
    def test_List_have_text(self):
        list = List.objects.get(text = "any thing")
        self.assertEqual(list.text , "any thing")
    def test_List_have_done(self):
        list = List.objects.get(text = "any thing")
        self.assertEqual(list.done , True)




class UrlTestCase(TestCase):
    def test_Signin_page_view_name_uses_correct_url(self):
        name = reverse('Signin')
        path = '/auth/signIn'
        self.assertEqual(name, path)

    def test_Signup_page_view_name_uses_correct_url(self):
        name = reverse('SignUp')
        path = '/auth/signUp'
        self.assertEqual(name, path)

    def test_Profilepage_page_view_name_uses_correct_url(self):
        name = reverse('Mainprofile')
        path = '/auth/user'
        self.assertEqual(name, path)



class RequestsTest(TestCase):

    def test_getBlogs(self):
        response = self.client.get('/blogs/')
        self.assertEqual(response.status_code, 200)
    

    def test_getProfile(self):
        response = self.client.get('/post/')
        self.assertEqual(response.status_code,200)
    
    def test_getHotels(self):
        response = self.client.get('/hotels/')

        self.assertEqual(response.status_code, 200)
    
    def test_addAccount(self):
        self.client = Client()
        response = self.client.post('/auth/signUp',{'username':'name','password':'pass',"email":"mail@mail.com"})
        self.assertEqual(response.status_code, 200)


    def test_postProfile(self):
        self.client = Client()
        response = self.client.post('/post/',{'username': 'areej',
        "email":'areej@yahoo.com',"password":"areej","url":"https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","bio":"my name is areej"
        })
        self.assertEqual(response.status_code, 201)
    

    def test_getTravel(self):
        self.client = Client()
        response = self.client.get('/TravelList/')
        self.assertEqual(response.status_code, 200)
    
    def test_postTravel(self):
        user =  Profile.objects.create(username="areej" , email="areej@yahoo.com",password="areej",bio="my name is areejAli",url="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
        self.client = Client()
        response = self.client.post('/TravelList/',{ "userId": user.id,'text': 'any thing',"done":True})
        self.assertEqual(response.status_code, 200)

    def test_postblog(self):
        user =  Profile.objects.create(username="areej" , email="areej@yahoo.com",password="areej",bio="my name is areejAli",url="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
        self.client = Client()
        response = self.client.post('/blogs/',{"ProfileId" : user.id ,"title":"any thing" ,"country":"amman","Blog":"my blog","image":"https://ntmresizer.azureedge.net/sized/358/284/www.cfmedia.vfmleonardo.com/imageRepo/6/0/100/1/34/ammsi-exterior-3061-hor-clsc_S.jpg"})
        self.assertEqual(response.status_code, 201)