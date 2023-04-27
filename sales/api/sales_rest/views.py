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
        "id",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "id",
        "automobile",
        "customer",
        "salesperson",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerListEncoder(),
        "salesperson": SalesPersonListEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "salesperson": o.salesperson.employee_id,
            "salesperson_first_name": o.salesperson.first_name,
            "salesperson_last_name": o.salesperson.last_name,
            "customer": o.customer.first_name,
            "customer_last_name": o.customer.last_name,
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


@require_http_methods(["GET", "POST"])
def api_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder,
        )
    else:
        content = json.loads(request.body)
        # try:
        automobile = AutomobileVO.objects.get(vin=content["automobile"])
        # if automobile.available is True:
        content["automobile"] = automobile
        salesperson = SalesPerson.objects.get(
            employee_id=content["salesperson"]
            )
        content["salesperson"] = salesperson
        customer = Customer.objects.get(first_name=content["customer"])
        content["customer"] = customer

        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleListEncoder,
            safe=False,
        )
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Could not create a sale"},
        #         status=400,
        #     )


@require_http_methods(["DELETE"])
def api_sale_delete(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
