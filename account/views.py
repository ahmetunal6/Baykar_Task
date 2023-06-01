from collections import UserDict
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
# Create your views here.
def login_request(request): #kullanıcının forma girdiği değerleri alarak authenticate ile oturum açıyoruz ve user varsa login ile giriş yapıyoruz değilse parola veya şifre hatalı diyoruz
    if request.method=="POST":
        username=request.POST["username"] 
        password=request.POST["password"]
        
        user=authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user) ## login kütüphanesi ile giriş yapıyoruz
            return redirect("Liste")
        else:
            return render(request,"login.html", {
                "error":"username ya da parola hatalı "
            })
    return render(request,"login.html")
   
def register_request(request,):##bu apide kullanıcının forma girdiği değerleri alarak create_user ile bir user oluşturup user.save ile kaydediyoruz
    if request.method=="POST":
         username=request.POST["username"]
         password=request.POST["password"]
         user=User.objects.create_user(username=username,password=password)
         user.save()
         return redirect("login")
    return render(request,"register.html")
def logout_request(request,):## log out ile çıkış işlemini yapıyoruz
    logout(request)
    # return redirect("home")