from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', signup),
    path('login/', login, name="login"),
    path('logout/', logout, name="logout"),
    path('welcome/', welcome, name="welcome"), # page after login
    path('create/', create, name="create"), # create job matching page
    path('alljobs/', alljobs, name="alljobs"), # view all created job matches
    path('allapplicants/', allapplicants, name="allapplicants"), # view all applicants
    path('job/<int:job_id>/', viewjob, name="job"), # view individual job matching results
    path('applicant/<int:applicant_id>', viewapplicant, name="applicant"), # view applicant information
    path('template/', template, name="template"), # for development
    path('resumepdf/<int:applicant_id>', resumepdf, name="resumepdf"),
    path('jdpdf/<int:job_id>', jdpdf, name="jdpdf")
]
