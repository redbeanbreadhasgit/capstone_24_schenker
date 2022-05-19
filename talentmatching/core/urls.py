from django.urls import path
from .views import *

urlpatterns = [
    path('', main),
    path('login/', login),
    path('welcome/', welcome), # page after login
    path('create/', create), # create job matching page
    path('alljobs/', alljobs), # view all created job matches
    path('job/', viewjob), # view individual job matching results
    path('applicant/', viewapplicant), # view applicant information
]