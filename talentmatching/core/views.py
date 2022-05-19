from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
# from .models import Student, LoginModel

# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello World</h1>")

def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        print(username)
        print(password)
        # print(LoginModel.objects.all())
        return redirect('/welcome')
        
    else:
        return render(request, "login.html")

def welcome(request):
    return HttpResponse("<h1>Welcome Page</h1>")

def create(request):
    return HttpResponse("<h1>Create new job matching page</h1>")

def alljobs(request):
    return HttpResponse("<h1>View created job matches page</h1>")

def viewjob(request):
    return HttpResponse("<h1>View job matching result page</h1>")

def viewapplicant(request):
    return HttpResponse("<h1>View applicant page</h1>")
