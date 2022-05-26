from django.urls import path
from .views import *

urlpatterns = [
    path('', signup),
    path('login/', login, name="login"),
    path('welcome/', welcome, name="welcome"), # page after login
    path('create/', create, name="create"), # create job matching page
    path('alljobs/', alljobs, name="alljobs"), # view all created job matches
    path('job/', viewjob, name="job"), # view individual job matching results
    path('applicant/', viewapplicant, name="applicant"), # view applicant information
]