from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User
from .models import MatchedJobModel


# Create your views here.
def signup(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        password2 = request.POST["password2"]

        if password == password2:
            if User.objects.filter(username=username).exists():
                messages.info(request, "Username Taken")
                return redirect('/')
            else:
                user = User.objects.create_user(username=username, password=password)
                user.save()
                messages.info(request, "Account created, proceed to login")
                return redirect('/')
        else:
            messages.info(request, "Password Not Matching")
            return redirect('/')
    else:   
        return render(request, "signup.html")

def login(request):
    return HttpResponse("<h1>Login Page</h1>")

def welcome(request):
    return HttpResponse("<h1>Welcome Page</h1>")

def create(request):
    return HttpResponse("<h1>Create new job matching page</h1>")

# def alljobs(request):
#     return render(request, "alljobs.html")
    # return HttpResponse("<h1>View created job matches page</h1>")

def alljobs(request):
    data = MatchedJobModel.objects.all() #All users apart from the SuperUser admin
    # store_data = []
    # for user in data:
    #     sta_time = Starttime.objects.filter(user_id = user)
    #     sta_data = sta_time.values_list('start_time', flat=True).latest('start_time')

    #     sto_time = Stoptime.objects.filter(user_id = user)
    #     sto_data = sto_time.values_list('stop_time', flat=True).latest('stop_time')

    #     store_data.append((user.first_name, sta_data, sto_data))
    return render(request, 'alljobs.html', {'data': data})

def viewjob(request):
    return HttpResponse("<h1>View job matching result page</h1>")

def viewapplicant(request):
    return HttpResponse("<h1>View applicant page</h1>")
