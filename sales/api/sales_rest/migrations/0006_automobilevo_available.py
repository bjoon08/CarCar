# Generated by Django 4.0.3 on 2023-04-27 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_remove_automobilevo_available'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='available',
            field=models.BooleanField(default=False),
        ),
    ]