from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
        "technician",
        ]
    encoders = {
        "technician": TechnicianEncoder(),
    }




@require_http_methods({"GET", "POST"})
def api_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    else:
        # try:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
        # return JsonResponse(
        #     {"message": "Could not create the Technician"},
        #     status=400,
        # )


@require_http_methods({"DELETE"})
def api_tech_delete(request):
    count, _ = Technician.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"GET", "POST"})
def api_appointments(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician_id = content["technician"]
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician

        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods({"DELETE"})
def api_appointment_delete(request, id):
    count, _ = Appointment.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"PUT"})
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.status = "cancelled"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )


@require_http_methods({"PUT"})
def api_finish_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
