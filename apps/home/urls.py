# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views
from .views import *

urlpatterns = [

    # The home page
    path('', views.index, name='home'),
    path('alljobs/', views.alljobs, name="alljobs"), # view all created job matches
    path('allapplicants/', views.allapplicants, name="allapplicants"), # view all applicants
    path('jobtest/', views.jobtest, name="jobtest"), # view all created job matches
    path('create-new-job/', views.create, name="create"), # view all created job matches
    path('job/<int:job_id>/', viewjob, name="job"), # view individual job matching results
    path('applicant/<int:applicant_id>', viewapplicant, name="applicant"), # view applicant information
    path('resumepdf/<int:applicant_id>', resumepdf, name="resumepdf"),
    path('jdpdf/<int:job_id>', jdpdf, name="jdpdf"),
    path('csv/<int:job_id>', csv_download, name="csv"),


    # Matches any html file
    re_path(r'^.*\.*/', views.pages, name='pages'),

]
