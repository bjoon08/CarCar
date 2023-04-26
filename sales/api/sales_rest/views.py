from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, Sale


# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
        "vin",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                employee_id=content["employee_id"],
            )
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid SalesPerson id"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_salesperson_delete(request, id):
    if request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                address=content["address"],
                phone_number=content["phone_number"],
            )
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer id"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_customer_delete(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )


# @require_http_methods(["GET", "POST"])
# def api_sale(request):
