# Generated by Django 4.0.3 on 2023-04-26 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0007_alter_technician_employee_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='sold',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, related_name='auto_sold', to='service_rest.automobilevo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]
