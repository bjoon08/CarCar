from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "customer",
        "technician",
        "vin"]


@require_http_methods({"GET", "POST"})
def api_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the Technician"}
            )
            response.status_code = 400
            return response


@require_http_methods({"DELETE"})
def api_tech_delete(request, id):
    count, _ = Technician.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"GET", "POST"})
def api_appointments(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin = content.get("vin")
            automobile = AutomobileVO.objects.get(vin=vin)
            appointment = Appointment.objects.create(automobile=automobile, **content)
            return JsonResponse(
                appointment,
                encoder=Appointment,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the Appointment"}
            )
            response.status_code = 400
            return response
