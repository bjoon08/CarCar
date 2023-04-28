# Generated by Django 4.0.3 on 2023-04-27 18:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='technician',
            options={'ordering': ('employee_id',)},
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='vin',
        ),
        migrations.AddField(
            model_name='appointment',
            name='auto',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='auto', to='service_rest.automobilevo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='sold',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='vip', to='service_rest.automobilevo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]