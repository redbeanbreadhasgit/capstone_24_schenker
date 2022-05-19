from django.db import models

# Create your models here.
# login id and password will be stored under auth_user, default table created by django
# FOREIGN KEY REFERS TO THE PRIMARY KEY IN ANOTHER TABLE
# AFTER EDITING, RUN THESE STEPS TO MAKE CHANGES TO DB
# python3 manage.py makemigrations
# python3 manage.py migrate

STATUS = [
    ('P', 'Pending'),
    ('S', 'Shortlisted'),
    ('R', 'Rejected')
]

# applicant information table
class ApplicantModel(models.Model):
    applicant_id = models.IntegerField(primary_key=True)
    job_id = models.ForeignKey("MatchedJobModel", on_delete=models.CASCADE)
    applicant_name = models.CharField(max_length=100)
    applicant_resume = models.FileField(upload_to='applicant_resume')
    recruiter_decision = models.CharField(max_length=1, choices=STATUS)
    applicant_experience = models.CharField(max_length=100)
    applicant_education = models.CharField(max_length=100)
    applicant_skills = models.CharField(max_length=100)

# hiring manager information table
class HiringManagerModel(models.Model):
    hiring_manager_id = models.IntegerField(primary_key=True)
    hiring_manager_name = models.CharField(max_length=50)
    hiring_manager_email = models.EmailField(max_length=100)

# created job matchings table
class MatchedJobModel(models.Model):
    job_id = models.IntegerField(primary_key=True)
    job_name = models.CharField(max_length=50)
    job_department = models.CharField(max_length=100)
    job_matching_date = models.DateField(auto_now_add=True)
    job_update_date = models.DateField(auto_now=True)

    recruiter_id = models.IntegerField() # link to user table
    hiring_manager_id = models.ForeignKey("HiringManagerModel", on_delete=models.CASCADE)

# model predictions table
class PredictionResultModel(models.Model):
    applicant_id = models.OneToOneField("ApplicantModel", on_delete=models.CASCADE, primary_key=True)
    applicant_percent = models.FloatField(max_length=50)
    applicant_rank = models.IntegerField()
