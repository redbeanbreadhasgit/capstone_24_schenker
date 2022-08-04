from .models import *
from django import forms


class StatusChangeForm(forms.ModelForm):
    class Meta:
        model = ApplicantModel
        fields = ['recruiter_decision']
            
    # def __init__(self, *args, **kwargs):
    #     new_choices = kwargs.pop('new_choices')
    #     super().__init__(*args, **kwargs)
    #     self.fields['new_choices'].choices = new_choices

class ReprofilingForm(forms.ModelForm):
    class Meta:
        model = MatchedJobModel
        fields = ['job_name']