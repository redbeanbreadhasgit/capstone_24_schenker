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

    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),
    path('job/<int:job_id>/', viewjob, name="job"), # view individual job matching results
    path('applicant/<int:applicant_id>', viewapplicant, name="applicant"), # view applicant information
    path('alljobs/', alljobs, name="alljobs"), # view all created job matches
    path('allapplicants/', allapplicants, name="allapplicants"), # view all applicants

]
