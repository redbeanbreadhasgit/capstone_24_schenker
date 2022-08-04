# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User, auth
from .forms import LoginForm, SignUpForm


def login_view(request):
    form = LoginForm(request.POST or None)

    msg = None

    if request.method == "POST":

        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("/")
            else:
                msg = 'Invalid credentials'
        else:
            msg = 'Error validating the form'

    return render(request, "accounts/login.html", {"form": form, "msg": msg})


##### SIGNUP ##############################################################################################################
def register(request):
    if request.method == "POST":
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        username = request.POST["username"]
        password = request.POST["password"]
        password2 = request.POST["password2"]

        # if any of the inputs are blank
        if firstname == "" or lastname == "" or username == "" or password == "" or password2 == "":
            messages.info(request, "First Name / Last Name / Username / Password field cannot be blank")
            return redirect('/')

        # if passwords are matching
        elif password == password2:

            # if username is taken
            if User.objects.filter(username=username).exists():
                messages.info(request, "Username Taken")
                return redirect('/')

            # if all fields are correct
            else:
                user = User.objects.create_user(username=username, password=password, first_name=firstname, last_name=lastname)
                user.save()
                messages.info(request, "Account created, proceed to login")
                return redirect('/')
        
        # passwords are not matching
        else:
            messages.info(request, "Password Not Matching")
            return redirect('/')
    else:   
        return render(request, "accounts/register.html")
