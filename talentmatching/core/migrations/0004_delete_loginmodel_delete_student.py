# Generated by Django 4.0.4 on 2022-05-19 10:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_rename_login_loginmodel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='LoginModel',
        ),
        migrations.DeleteModel(
            name='Student',
        ),
    ]
