# Generated by Django 2.2.2 on 2019-06-17 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pheonixapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='username',
            field=models.CharField(default='SOME STRING', max_length=100),
        ),
    ]
