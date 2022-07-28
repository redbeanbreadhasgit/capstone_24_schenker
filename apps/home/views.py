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
from django.contrib.auth.models import User, auth
from django.contrib import messages
# from django.db import IntegrityError
from django.core.files.storage import FileSystemStorage
from django.utils.datastructures import MultiValueDictKeyError
from django.db.models import Q

from .models import *
from .keyword import *
from .forms import *
from .finalModel import *

import datetime
import csv
import random


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
##### CREATE JOB MATCHING ##############################################################################################################
@login_required(login_url='login')
def create(request):
    if request.method == "POST":
        # get new jobname
        new_jobname = request.POST["jobname"]

        # recruiter clicks "get job name"; check if job name exists in database
        if request.POST.get("validation"): 
            # if jobname is empty
            if new_jobname == "":
                messages.info(request, "Job Name cannot be blank")
                return redirect('create')

            # if jobname already exists in database
            elif MatchedJobModel.objects.filter(job_name=new_jobname).exists():
                messages.info(request, "Job Name exists, please choose another one")
                return redirect('create')

            # display message that job name is available and proceed
            else:
                messages.info(request, "Job Name available, please proceed")
                return render(request, 'home/create-new-job.html', {'data': new_jobname})
        
        # recruiter clicks "get job matching"
        else: # request.POST.get("getmatching"):
            try: # check if fields exist, else throws MultiValueDictKeyError
                # get data inputs from recruiter
                jd_file = request.FILES["jdfile"]
                resume_files = request.FILES.getlist("resumes")
                skill_keywords = request.POST["skillkeywords"]
                skill_keywords = keywords_list(skill_keywords)
                skill_keywords = list_to_string(skill_keywords)

                # set file locations
                file_location = "apps/static/" + new_jobname + "/"
                file_storage = FileSystemStorage(location = file_location)

                # save jd file
                jd_fs =  file_storage
                jd_fs.save(jd_file.name, jd_file) # uncomment to enable file saving

                # store jd info to database
                MatchedJobModel.objects.create(
                    job_name = new_jobname, 
                    job_keywords = skill_keywords,
                    job_matching_date = datetime.date.today(), 
                    job_update_date = datetime.date.today(), 
                    recruiter_id_id = request.user.id,
                    job_description = jd_file.name,
                    job_status = "Open")
                
                # get job_id of this newly created job
                new_job = MatchedJobModel.objects.get(job_name=new_jobname)

                # save resume files & store info to database
                resume_fs = file_storage

                # loop through all resumes, create a new entry for each resume, initialise history, 
                # then loop through all available jobs and get % suitability for each job
                for resume in resume_files:
                    resume_name = resume.name
                    resume_fs.save(resume_name, resume) # uncomment to enable file saving
                    
                    # TODO: extract names from resume => hard to do, so currently we are using filenames

                    # Create new applicant row data
                    ApplicantModel.objects.create(
                            job_id = new_job,
                            applicant_name = resume_name.replace(".pdf", ""),
                            applicant_resume = resume_name,
                            recruiter_decision = "Pending")
                    
                    # Get newly created applicant_id
                    applicant_id = ApplicantModel.objects.latest('applicant_id').applicant_id

                    # initialise history for the applicant, saved as pending for job applied
                    ApplicantHistoryModel.objects.create(
                        applicant_id = ApplicantModel.objects.get(applicant_id = applicant_id),
                        job_id = new_job,
                        recruiter_decision = "Pending",
                        recruiter_id = request.user,
                        status_change_date = datetime.date.today()
                    )

                    # Get list of predictions
                    predictions_list = getModelPredictions(file_location+resume_name)
                    fse_prediction = predictions_list[0][3]
                    gpis_prediction = predictions_list[0][4]
                    sa_prediction = predictions_list[0][5]

                    # get names of all created job matchings, including the newly created one for % suitability
                    created_jobs_list = MatchedJobModel.objects.values_list("job_name", flat=True)
                    for job in created_jobs_list:

                        # get job id
                        if job == new_jobname: # if this is the newly created job
                            created_job_id = new_job.job_id
                        else: # for the jobs that already exist in the database
                            created_job_id = MatchedJobModel.objects.get(job_name = job).job_id

                        # get job keywords for the job
                        created_jd_keywords = MatchedJobModel.objects.get(job_name = job).job_keywords

                        # match keywords to resume to extract applicant's skills for that job
                        applicant_skills = keyword_matching(created_jd_keywords, file_location+resume_name)
                        applicant_skills = list_to_string(applicant_skills)

                        # TODO: load files into prediction model, get % suitability for this job & resume
                        # created_jd_filename = MatchedJobModel.objects.get(job_name = job).job_description
                        # created_jd_filepath = "static/" + job + "/" + created_jd_filename
                        
                        if job == "Field Support Engineer":
                            percent = fse_prediction
                        elif job == "GPIS Executive":
                            percent = gpis_prediction
                        elif job == "System Analyst":
                            percent = sa_prediction
                        else:
                            percent = random.random()

                        # save model prediction information into database
                        ModelPredictionModel.objects.create(
                                applicant_id_id = applicant_id,
                                job_id_id = created_job_id,
                                applicant_skills = applicant_skills,
                                applicant_percent = round(percent*100, 1))

                # message to inform recruiter that matching has been completed
                messages.info(request, "Matching Created")
                return redirect('create')
            
            except MultiValueDictKeyError:
                messages.info(request, "Must upload files")
                return render(request, 'home/create-new-job.html', {'data': new_jobname})

            # except IntegrityError:
            #     messages.info(request, "Job name taken, use another")
            #     return render(request, 'create.html')

    else:
        return render(request, 'home/create-new-job.html')

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

    return render(request, 'home/alljobs.html', {'data': store_data})

##### VIEW ALL APPLICANTS ##############################################################################################################
@login_required(login_url='login')
def allapplicants(request):
    # initialise list to store data of all applicants
    store_data = []

    # get all applicants data from database
    data = ApplicantModel.objects.all()
    for applicant in data:
        # get displayed data
        name = applicant.applicant_name
        applicant_id = applicant.applicant_id
        job_id = applicant.job_id_id
        job = MatchedJobModel.objects.get(job_id = job_id).job_name
        print(job_id)
        print(applicant_id)
        applicant_percent = ModelPredictionModel.objects.get(job_id_id = job_id, applicant_id_id = applicant_id).applicant_percent
        decision = applicant.recruiter_decision

        store_data.append({            
            "applicant_id": applicant_id,
            "applicant_name": name,
            "applicant_percent": applicant_percent,
            "job_id": job_id,
            "job_name": job,
            "recruiter_decision": decision})

    return render(request, 'home/allapplicants.html', {'data': store_data})

##### VIEW INDIVIDUAL JOB ################################################################################################
@login_required(login_url='login')
def viewjob(request, job_id):
    # get job name
    job_details = MatchedJobModel.objects.get(job_id = job_id)
    recruiter = User.objects.get(id=job_details.recruiter_id_id)
    recruiter_name = recruiter.first_name + " " + recruiter.last_name

    # get applicants with this job id
    data = ApplicantModel.objects.filter(Q(job_id_id = job_id) | Q(job_id_reprofile_id = job_id))
    
    # initialise list to store applicants data for requested job
    applicant_data = []

    # get applicant information for display
    for applicant in data:
        id = applicant.applicant_id
        predict_data = ModelPredictionModel.objects.get(applicant_id_id = id, job_id_id = job_id)

        name = applicant.applicant_name
        percent = predict_data.applicant_percent
        decision = applicant.recruiter_decision
        skills = predict_data.applicant_skills

        applicant_data.append({"applicant_id": id,
        "applicant_name": name,
        "applicant_percent": percent,
        "recruiter_decision": decision,
        "applicant_skills": skills})
    
    # sort applicant information by their % suit, descending
    applicant_data_sorted = sorted(applicant_data, key=lambda x: x['applicant_percent'], reverse=True)

    # for recruiter to close the job
    if request.POST.get("closejob"):
        job_details.job_status = "Closed"
        job_details.save()
        messages.info(request, "Job has been closed.")
        return redirect(reverse("job",kwargs={'job_id':str(job_id)}))

    # for recruiter to multi change status of applicants
    elif request.method == "POST":
        # get the submitted form information
        status_change_form = StatusChangeForm(request.POST)

        # verify that form is valid
        if status_change_form.is_valid():
            # get list of checked applicants
            applicant_list = request.POST.getlist('checkboxall')
            # get updated status
            status_change = status_change_form.cleaned_data["recruiter_decision"]

            # reprofiling must be done in individual applicant page, throw error message
            if status_change == "Reprofiled":
                messages.info(request, "Reprofiling done in individual applicant page")
                return redirect(reverse("job",kwargs={'job_id':str(job_id)}))
            
            # if none of the applicants are selected
            elif applicant_list == []:
                messages.info(request, "Please check at least one box")
                return redirect(reverse("job",kwargs={'job_id':str(job_id)}))

            # save the changes into the database
            else:
                for applicant_id in applicant_list:
                    # update the Applicant table
                    applicant = ApplicantModel.objects.get(applicant_id = applicant_id)
                    applicant.recruiter_decision = status_change
                    applicant.save()

                    # update the ApplicantHistory table
                    ApplicantHistoryModel.objects.create(
                        applicant_id = applicant,
                        job_id = job_details,
                        recruiter_decision = status_change,
                        recruiter_id = request.user,
                        status_change_date = datetime.date.today()
                    )

                # inform recruiter that status saved and updated
                messages.info(request, "Applicant status updated")
                return redirect(reverse("job",kwargs={'job_id':str(job_id)}))

    else:
        # TODO: how to remove reprofiling option? cannot multi change to reprofiling since need to pick job
        # status_change_form = ApplicantModelForm(new_choices=(('1','Pending'), ('2','Shortlisted'), ('3','Rejected'),))    
        status_change_form = StatusChangeForm()    

    return render(request, 'home/job.html', 
    {'job_details': job_details,
    'recruiter_name': recruiter_name,
    'data': applicant_data_sorted, 
    'form': status_change_form})

##### VIEW INDIVIDUAL APPLICANT ##############################################################################################################
@login_required(login_url='login')
def viewapplicant(request, applicant_id):

    # get applicant overall data
    applicant = ApplicantModel.objects.get(applicant_id=applicant_id) 
    name = applicant.applicant_name
    recruiter_decision = applicant.recruiter_decision
    applied_job_id = applicant.job_id_id
    applied_job_name = MatchedJobModel.objects.get(job_id = applied_job_id).job_name

    # check for reprofiling details
    if applicant.reprofile == True:
        reprofiled_job_id = applicant.job_id_reprofile_id
        reprofiled_job_name = MatchedJobModel.objects.get(job_id = reprofiled_job_id).job_name
    else:
        reprofiled_job_name = "-"
    
    # get applicant prediction data for all jobs
    predict_data = ModelPredictionModel.objects.filter(applicant_id_id=applicant_id)
    job_data = []
    for result in predict_data:
        predict_job_id = result.job_id_id
        predict_job_name = MatchedJobModel.objects.get(job_id = predict_job_id).job_name

        percent = result.applicant_percent
        skills = result.applicant_skills

        # get rank in job
        job_all_applicants = ModelPredictionModel.objects.filter(job_id_id=predict_job_id).values_list("applicant_id_id", "applicant_percent").order_by("-applicant_percent")
        # not sure if there's a function to get row number after sorting, so hard coding it
        for i in range(len(job_all_applicants)):
            if job_all_applicants[i][0] == applicant_id:
                applicant_rankinjob = i+1   # i+1 since python starts from 0

        # append to job_data list for frontend display purposes
        job_data.append({"job_name": predict_job_name,
            "job_id": predict_job_id,
            "applicant_percent": percent,
            "applicant_rankinjob": applicant_rankinjob,
            "applicant_skills": skills})

    # get applicant history data
    applicant_history = ApplicantHistoryModel.objects.filter(applicant_id = applicant_id).order_by("-status_change_date")

    # initialise list to store applicant history data for display
    history_data = []

    # retrieve displayed data
    for row in applicant_history:
        history_job_name = MatchedJobModel.objects.get(job_id = row.job_id_id).job_name
        history_status = row.recruiter_decision
        history_date = row.status_change_date
        recruiter = User.objects.get(id=row.recruiter_id_id)
        history_recruiter_name = recruiter.first_name + " " + recruiter.last_name
        
        history_data.append({"history_job_name": history_job_name,
        "history_status": history_status,
        "history_date": history_date,
        "history_recruiter_name": history_recruiter_name})

    # change applicant's status
    if request.method == "POST":
        status_change = request.POST.get("status_change_form")
        chosen_reprofile_job = request.POST.get("chosen_reprofile_job")

        # both status change and reprofiling selected
        if (status_change != "") & (chosen_reprofile_job != ""): 
            messages.info(request, "Shortlist/Reject OR choose job for reprofiling, not both")
            return redirect(reverse("applicant",kwargs={'applicant_id':str(applicant_id)}))
        
        # shortlist/reject selected
        elif (status_change != "") & (chosen_reprofile_job == ""): 
            # save information into applicant table
            applicant.recruiter_decision = status_change
            applicant.save()

            # create entry in the applicant history table
            ApplicantHistoryModel.objects.create(
                        applicant_id = applicant,
                        job_id = MatchedJobModel.objects.get(job_id = applied_job_id),
                        recruiter_decision = status_change,
                        recruiter_id = request.user,
                        status_change_date = datetime.date.today())

            messages.info(request, "Applicant status changed to " + status_change)
            return redirect(reverse("applicant",kwargs={'applicant_id':str(applicant_id)}))

        # reprofiling selected
        elif (status_change == "") & (chosen_reprofile_job != ""): 
            # reprofiled job same as applied job, display error message
            if chosen_reprofile_job == applied_job_name: 
                messages.info(request, "Reprofiled job is the same as applied job")
                return redirect(reverse("applicant",kwargs={'applicant_id':str(applicant_id)}))
            # reprofiling
            else:
                # save information into the applicant table
                applicant.recruiter_decision = "Reprofiled"
                applicant.reprofile = True
                applicant.job_id_reprofile_id = MatchedJobModel.objects.get(job_name=chosen_reprofile_job).job_id
                applicant.save()

                # create entry in the applicant history table
                ApplicantHistoryModel.objects.create(
                        applicant_id = applicant,
                        job_id = MatchedJobModel.objects.get(job_name=chosen_reprofile_job),
                        recruiter_decision = status_change,
                        recruiter_id = request.user,
                        status_change_date = datetime.date.today())

                messages.info(request, "Applicant has been reprofiled to " + chosen_reprofile_job)
                return redirect(reverse("applicant",kwargs={'applicant_id':str(applicant_id)}))
        
        # neither status change nor reprofiling selected
        else: 
            messages.info(request, "Either Shortlist/Reject or choose job for reprofiling")
            return redirect(reverse("applicant",kwargs={'applicant_id':str(applicant_id)}))    

    # consolidate data for frontend
    # TODO: add urls to job names, but not sure how with appls without reprofiled jobs
    display_data = {
    'name': name, 
    'applicant_id': applicant_id,
    'applied_job_id': applied_job_id,
    'applied_job_name': applied_job_name,
    'reprofiled_job_name': reprofiled_job_name,
    'recruiter_decision': recruiter_decision, 
    'job_data': job_data,
    'history_data': history_data}
    return render(request, 'home/applicant.html', display_data)

##### VIEW APPLICANT RESUME FILES ##############################################################################################################
def resumepdf(request, applicant_id):
    # get applicant details
    applicant = ApplicantModel.objects.get(applicant_id=applicant_id) 
    jobname = MatchedJobModel.objects.get(job_id = applicant.job_id_id).job_name

    # get resume filepath and filename
    resume_filename = str(applicant.applicant_resume)
    resume_foldername = str(jobname)
    resume_filepath = "apps/static/" + resume_foldername + "/" + resume_filename
    
    with open(resume_filepath, 'rb') as pdf:
        response = HttpResponse(pdf.read(), content_type='application/pdf')
        return response

##### VIEW JOB DESCRIPTION FILES ##############################################################################################################
def jdpdf(request, job_id):
    # get job details
    job = MatchedJobModel.objects.get(job_id = job_id)

    # get resume filepath and filename
    jd_filename = str(job.job_description)
    jd_foldername = str(job.job_name)
    jd_filepath = "apps/static/" + jd_foldername + "/" + jd_filename
    
    with open(jd_filepath, 'rb') as pdf:
        response = HttpResponse(pdf.read(), content_type='application/pdf')
        return response

##### DOWNLOAD INDIV JOB APPLICANT STATUS ##############################################################################################################
def csv_download(request, job_id):

    # Get dataset
    applicants = ApplicantModel.objects.filter(job_id_id = job_id)
    job_name = MatchedJobModel.objects.get(job_id = job_id).job_name

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse('')
    filename = 'attachment; filename=' + job_name + ' Applicants.csv'
    response['Content-Disposition'] = filename

    # Create the CSV writer using the HttpResponse as the "file"
    writer = csv.writer(response)
    writer.writerow(['Resume', 'Job Name', 'Recruiter Decision', 'Reprofiled', 'Reprofiled Job'])

    # Get row csv data
    for applicant in applicants:
        resume_name = applicant.applicant_resume
        recruiter_decision = applicant.recruiter_decision
        reprofiled = applicant.reprofile
        if applicant.job_id_reprofile_id is not None:
            reprofiled_job_name = MatchedJobModel.objects.get(job_id = applicant.job_id_reprofile_id).job_name
        else:
            reprofiled_job_name = ""

        writer.writerow([resume_name, job_name, recruiter_decision, reprofiled, reprofiled_job_name])
    return response
@login_required(login_url='login')
def jobtest(request):
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

    return render(request, 'home/jobtest.html', {'data': store_data})
