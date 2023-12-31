from django.urls import path


from .views import (
    api_technicians,
    api_tech_delete,
    api_appointments,
    api_appointment_delete,
    api_cancel_appointment,
    api_finish_appointment
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>", api_tech_delete, name="api_tech_delete"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>", api_appointment_delete, name="api_appointment_delete"),
    path("appointments/<int:id>/cancel", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:id>/finish", api_finish_appointment, name="api_finish_appointment"),
]
