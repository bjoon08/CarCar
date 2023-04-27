from django.urls import path
from sales_rest.views import (
    api_salesperson,
    api_salesperson_delete,
    api_customer,
    api_customer_delete,
    api_sale,
    api_sale_delete,
)


urlpatterns = [
    path("salespeople/", api_salesperson, name="api_salesperson"),
    path(
        "salespeople/<int:id>/",
        api_salesperson_delete,
        name="api_salesperson_delete"
    ),
    path("customers/", api_customer, name="api_customer"),
    path(
        "customers/<int:id>/",
        api_customer_delete,
        name="api_customer_delete"
    ),
    path("sales/", api_sale, name="api_sale"),
    path("sales/<int:id>/", api_sale_delete, name="api_sale_delete"),
]
