# Generated by Django 4.0.4 on 2022-05-19 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_login'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='login',
            new_name='LoginModel',
        ),
    ]