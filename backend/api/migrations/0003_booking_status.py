# Generated by Django 5.1.4 on 2024-12-12 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_rentalitem_availability'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='status',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
