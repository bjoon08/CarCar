# CarCar

Team:

* Brandon Joon Hyuk Jang - Sales Microservice
* Ramon Duarte - Services Microservices

## Design

In our project's backend, we have three main bounded contexts: Inventory, Sales, and Services. To collect information on Automobiles, Sales and Services poll from Inventory. This allows the creation of AutomobileVO objects.

![Excalidraw Drawing](ghi/app/public/ProjectBeta.png)

The front end makes its API calls from the App.js file and the returned data is migrated to the front end. Upon completion of a form, additional "GET" and "PUT" requests are made to update accordingly.

![Excalidraw Drawing](ghi/app/public/FrontEndBackEnd.png)

## Instructions

1. Navigate to (https://gitlab.com/Krze44/car-car-project-beta) and fork the project
2. Clone the repo using the HTTPS link
3. Navigate to a project folder, or your designated folder and clone the project using the following commands
    `git clone *repo link*`
    `git cd *cloned repo*`
4. 

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
