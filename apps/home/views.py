# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import redirect, render

from .models import *


@login_required(login_url="/login/")
def index(request):
    pending_applicants = ApplicantModel.objects.filter(recruiter_decision="Pending").count()
    open_jobs = MatchedJobModel.objects.filter(job_status="Open").count()
    data = {"pending_applicants": pending_applicants,"open_jobs": open_jobs }
    return render(request, 'home/index.html', {"data": data})


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))

##### VIEW ALL JOBS ##############################################################################################################
@login_required(login_url='login')
def alljobs(request):
    # get all jobs information from database
    data = MatchedJobModel.objects.all() 

    # initialise list to store data of all jobs
    store_data = []

    # get displayed data
    for job in data:
        job_id = job.job_id
        job_name = job.job_name
        job_matching_date = job.job_matching_date
        job_update_date = job.job_update_date
        recruiter_id = job.recruiter_id_id
        recruiter_firstname = User.objects.filter(id=recruiter_id).values_list("first_name", flat=True)[0]
        recruiter_lastname = User.objects.filter(id=recruiter_id).values_list("last_name", flat=True)[0]
        recruiter_name = recruiter_firstname + " " + recruiter_lastname
        job_description = job.job_description
        job_status = job.job_status

        store_data.append({            
            "job_id": job_id,
            "job_name": job_name,
            "job_matching_date": job_matching_date,
            "job_update_date": job_update_date,
            "recruiter_name": recruiter_name,
            "job_description": job_description,
            "job_status": job_status})

    return render(request, 'all-jobs.html', {'data': store_data})
