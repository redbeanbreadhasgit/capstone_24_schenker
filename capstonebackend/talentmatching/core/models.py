from django.db import models
from django.conf import settings

# Create your models here.
# login id and password will be stored under auth_user, default table created by django
# FOREIGN KEY REFERS TO THE PRIMARY KEY IN ANOTHER TABLE
# AFTER EDITING, RUN THESE STEPS TO MAKE CHANGES TO DB
# python3 manage.py makemigrations
# python3 manage.py migrate

# applicant information table
class ApplicantModel(models.Model):
    APPLICANT_STATUS = [
    ('Pending', 'Pending'),
    ('Shortlisted', 'Shortlisted'),
    ('Rejected', 'Rejected'),
    ('Reprofiled', 'Reprofiled')
    ]
    applicant_id = models.IntegerField(primary_key=True)
    job_id = models.ForeignKey("MatchedJobModel", on_delete=models.CASCADE, related_name="original")
    applicant_name = models.CharField(max_length=100, unique=False)
    applicant_resume = models.FileField(upload_to='applicant_resume')
    recruiter_decision = models.CharField(max_length=20, choices=APPLICANT_STATUS)
    reprofile = models.BooleanField(default=False)
    job_id_reprofile = models.ForeignKey("MatchedJobModel", on_delete=models.CASCADE, null=True, related_name="reprofile")

# hiring manager information table
class HiringManagerModel(models.Model):
    hiring_manager_id = models.IntegerField(primary_key=True)
    hiring_manager_name = models.CharField(max_length=50)
    hiring_manager_email = models.EmailField(max_length=100)

# created job matchings table
class MatchedJobModel(models.Model):
    JOB_STATUS = [
    ('Open', 'Open'),
    ('Closed', 'Closed')
    ]
    job_id = models.IntegerField(primary_key=True)
    job_name = models.CharField(max_length=50, unique=True)
    job_keywords = models.CharField(max_length=200, unique=False)
    job_matching_date = models.DateField(auto_now_add=True)
    job_update_date = models.DateField(auto_now=True)
    job_description = models.FileField(upload_to='job_description')
    job_status = models.CharField(max_length=20, choices=JOB_STATUS)
    recruiter_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

# prediction for each applicant to each available job in database
class ModelPredictionModel(models.Model):
    result_id = models.IntegerField(primary_key=True)
    applicant_id = models.ForeignKey("ApplicantModel", on_delete=models.CASCADE)
    job_id = models.ForeignKey("MatchedJobModel", on_delete=models.CASCADE)
    applicant_skills = models.CharField(max_length=100)
    applicant_percent = models.FloatField(max_length=50)

# applicant history table
class ApplicantHistoryModel(models.Model):
    APPLICANT_STATUS = [
    ('Pending', 'Pending'),
    ('Shortlisted', 'Shortlisted'),
    ('Rejected', 'Rejected'),
    ('Reprofiled', 'Reprofiled')
    ]
    history_id = models.IntegerField(primary_key=True)
    applicant_id = models.ForeignKey("ApplicantModel", on_delete=models.CASCADE)
    job_id = models.ForeignKey("MatchedJobModel", on_delete=models.CASCADE, null=True)
    recruiter_decision = models.CharField(max_length=20, choices=APPLICANT_STATUS)
    status_change_date = models.DateTimeField(auto_now_add=True)
    recruiter_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
