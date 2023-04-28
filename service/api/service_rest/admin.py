from django.contrib import admin
from .models import Appointment, Technician
# Register your models here.


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass
