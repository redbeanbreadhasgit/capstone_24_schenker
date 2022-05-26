from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User
from .models import MatchedJobModel, ApplicantModel, PredictionResultModel


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


# @login_required(login_url='signin')
# TODO: filter by recruiter
def alljobs(request):
    data = MatchedJobModel.objects.all() 
    return render(request, 'alljobs.html', {'data': data})

# 
def viewjob(request):
    store_data = []
    data = ApplicantModel.objects.all() # TODO: filter by recruiter & selected job
    for applicant in data:
        print(applicant)
        name = applicant.applicant_name
        percent = PredictionResultModel.objects.filter(applicant_id_id = applicant.applicant_id).values_list("applicant_percent", flat=True)[0]
        decision = applicant.recruiter_decision
        experience = applicant.applicant_experience
        education = applicant.applicant_education
        skills = applicant.applicant_skills

        store_data.append({"applicant_name": name,
        "applicant_percent": percent,
        "recruiter_decision": decision,
        "applicant_experience": experience,
        "applicant_education": education,
        "applicant_skills": skills})

    return render(request, 'viewjob.html', {'data': store_data})

def viewapplicant(request):
    applicant = ApplicantModel.objects.get(applicant_id=1) # TODO: filter by recruiter & selected job
    name = applicant.applicant_name
    percent = PredictionResultModel.objects.filter(applicant_id_id = applicant.applicant_id).values_list("applicant_percent", flat=True)[0]
    decision = applicant.recruiter_decision
    experience = applicant.applicant_experience
    education = applicant.applicant_education
    skills = applicant.applicant_skills
    resume = applicant.applicant_resume
    jd = MatchedJobModel.objects.filter(job_id = applicant.job_id_id).values_list("job_description", flat=True)[0]


    store_data = {"applicant_name": name,
    "applicant_percent": percent,
    "recruiter_decision": decision,
    "applicant_experience": experience,
    "applicant_education": education,
    "applicant_skills": skills,
    "applicant_resume": resume,
    "job_description": jd}

    return render(request, 'viewapplicant.html', {'data': store_data})

