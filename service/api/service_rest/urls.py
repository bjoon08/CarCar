from django.urls import path


from .views import (
    api_technicians,
    api_tech_delete,
    api_appointments
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>", api_tech_delete, name="api_tech_delete"),
    path("appointments/", api_appointments, name="api_appointments"),
]
