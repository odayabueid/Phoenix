# Generated by Django 2.0.7 on 2019-06-12 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pheonixapp', '0003_blogs_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogs',
            name='country',
            field=models.CharField(default='SOME STRING', max_length=100),
        ),
    ]
