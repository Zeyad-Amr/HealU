from django.shortcuts import render , get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from . import paypal_utils as utils
from .models import *
from django.utils import timezone
import requests
from django.http import JsonResponse, Http404
import json
from django.views.decorators.http import require_http_methods
import environ
from .serializers import InvoiceSerializer, BillSerializer
env=environ.Env()

def get_services_data(services_ids):
     ### replace with logic for admin api call
     # only use 5 for testing because there are no other services currently
     Admin_services_url=f'https://admin-service-healu.onrender.com/api/v1/clinicService/'
     services_names=[]
     services_amounts=[]
     for id in services_ids:
          response=requests.get(f'{Admin_services_url}{id}')
          if response.status_code== 200:
            service_data=json.loads(response.text)
            service_name=service_data['data']['clinicService']["name"]
            service_amount=service_data['data']['clinicService']["price"]
            services_names.append(service_name)
            services_amounts.append(service_amount)
            services_response={
                 "status code": response.status_code,
                 "services_names":services_names,
                 "services_amounts":services_amounts
            }
          else : ### handle 404 and other cases
                services_response={
                 "status code": response.status_code,
                 "error": response.text
                     }
        
     return services_response

def get_patient_from_appointment(appointment_id):
     ### appointment api logic
     print("entered appointment")
     api_url = f'https://appointment-service-y30u.onrender.com/appointments/{appointment_id}'
     response=requests.get(api_url)
         
     if (response.status_code)== 200:
         # API appointment returns NULL with status code 200 for deleted appointments
        if (response.json() is None):
            patient_response= {
                "status code": "none",
                "error": "api returned a null patient"
            }
        else:    
            appointment_response=json.loads(response.text)
            print(appointment_response)
            patient_id=appointment_response["patientId"]
            patient_response= {
                "status code": response.status_code,
                "patient_id": patient_id
            }
     else:
        patient_response= {
             "status code": response.status_code,
             "error": response.text
        }  
     return patient_response

def get_insurance_percentage(patient_id):
     registeration_url=f'https://registration-zf9n.onrender.com/patient/'
     response=requests.get(f'{registeration_url}{patient_id}')
     print(response)
     if response.status_code ==200:
         data=json.loads(response.text)
         insurance=data["data"]['insurancePersentage']
         insurace_response={
             "status code": response.status_code,
             "insurance": insurance   
         }
     else: 
        insurace_response={
             "status code": response.status_code,
             "error": response.text   
         }      
     return insurace_response

    

@csrf_exempt
@require_http_methods(["DELETE","GET"])
def handle_invoice(request,id):
    if request.method=="DELETE":
        try:
            invoice = get_object_or_404(Invoice, id=id)
            invoice.delete()
            response= { 
                "message":"invoice deleted successfully"
                    }
            return JsonResponse(response)
        except :
            response= { 
                "message":"invoice not found"
                    }
            return JsonResponse(response,status=404)
        
    elif request.method=="GET":
        try:
            invoice = get_object_or_404(Invoice, id=id)
        except:
            response= { 
                "message":"invoice not found"
                    }
            return JsonResponse(response,status=404)
        response=InvoiceSerializer(invoice,many=False)
        return JsonResponse(response.data,safe=False)
          
@csrf_exempt
@require_http_methods(["POST"])
def new_invoice(request) :
     if request.method == 'POST':
          try:
            data=json.loads(request.body.decode("utf-8"))
            print(data['appointmentId'],data['servicesIds'])
            # Assertion to check if the variable is a string
            assert isinstance(data['appointmentId'], str), "The variable is not a string."

            # If the assertion fails, the code after this line will not be executed
            print("The variable is a string.")
          except:
              response={
                  "message": "an error occured during parsing the request body, refer to the docs for the correct body"
              }
              return JsonResponse(response,status=500)
          patient_response=get_patient_from_appointment(data['appointmentId'])
          services_response=get_services_data(data['servicesIds'])
          if(patient_response["status code"]==200 and services_response["status code"]==200 )  :
            patient_id=patient_response["patient_id"]
            insurace_response=get_insurance_percentage(patient_id)
            if (insurace_response["status code"]==200 ):
                services_names=services_response["services_names"]
                services_amounts=services_response["services_amounts"]
                insurance_percentage=insurace_response["insurance"]
                amounts_after_insurace=[(1-float(insurance_percentage))* amount for amount in services_amounts]
                new_invoice=Invoice(    appointmentId=data['appointmentId'],
                                patientId=patient_id,
                                status="PN",
                                dateTime=timezone.now().isoformat(),
                                servicesIds=data['servicesIds'],
                                servicesAmounts=services_amounts,
                                amountsAfterInsurance=amounts_after_insurace,
                                servicesNames=services_names,
                                total=sum(amounts_after_insurace))
                new_invoice.save()
                response=InvoiceSerializer(new_invoice,many=False)
                return JsonResponse(response.data,safe=False)
            else:
                reponse={
                "message": "an error occured during insurance API call",
                "insurance API": insurace_response

                }
            return JsonResponse(reponse,status=404)

          else:
            response={
                "message": "an error occured during an external API call",
                "patient_API":patient_response ,
                "services_API": services_response,
                }
            return JsonResponse(response,status=404)

              
        
@csrf_exempt
@require_http_methods(["GET"])
def get_all_patient_invoices(request,patient_id):
     filtered_invoices = Invoice.objects.filter(patientId=patient_id)
     serializer = InvoiceSerializer(filtered_invoices,many=True) 
     return JsonResponse(serializer.data,safe=False)


@csrf_exempt
@require_http_methods(["GET"])
def get_all_invoices(request):
     invoices = Invoice.objects.all()
     serializer = InvoiceSerializer(invoices,many=True) 
     if len(invoices)==0:
         return JsonResponse({"message":" no invoices found"},status=404) 
     return JsonResponse(serializer.data,safe=False)

@csrf_exempt
@require_http_methods(["GET"])
def get_all_invoices_appointment(request,appointment_id):
     filtered_invoices = Invoice.objects.filter(appointmentId=appointment_id)
     if len(filtered_invoices)==0:
         return JsonResponse({"message":" no invoices found"},status=404) 
     serializer = InvoiceSerializer(filtered_invoices,many=True) 
     return JsonResponse(serializer.data,safe=False)
    

    
          
@csrf_exempt
def new_bill(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        try:
            invoice = get_object_or_404(Invoice, id=body["invoiceId"])
        except Http404:
            return JsonResponse({"message":"invoice not found"}, status=404)
        
        if invoice.status=="PD":
            return JsonResponse({"message":"invoice is already paid"}, status=400)

        if body["paymentMethod"]=="card":
            paymentSource = body["paymentSource"]["card"]       
            response = utils.pay_with_card(amount= round(invoice.total,2), card_number=paymentSource["number"],expiry=paymentSource["expiry"],cvv=paymentSource["cvv"],name=paymentSource["name"])
            if response.status_code == 201:
                bill = Bill(invoiceId = invoice,  paymentMethod = "ON", dateTime = timezone.now().isoformat())
                bill.save()
                invoice.status="PD"
                invoice.save()
                response = BillSerializer(bill).data
                return JsonResponse(response, status=201, safe=False)
            else:
                return JsonResponse({"message": "payment unsuccessful"}, status=response.status_code, safe=False)
            
        if body["paymentMethod"] == "offline":
            bill = Bill(invoiceId = invoice, paymentMethod = "OF", dateTime = timezone.now().isoformat())
            bill.save()
            invoice.status="PD"
            invoice.save()
            response = BillSerializer(bill).data
            return JsonResponse(response, status = 201, safe=False)

        return JsonResponse({"message": "Invalid request"}, status=400)

@csrf_exempt
def handle_bill(request, id):
    try:
        bill = get_object_or_404(Bill, id=id)
    except Http404:
        return JsonResponse({"message":"bill not found"}, status=404)
    if request.method == 'DELETE':
        bill.delete()
        response= {"message":"bill deleted successfully"}
        return JsonResponse(response, status=200)
    
    elif request.method == 'GET':
        response = BillSerializer(bill).data
        return JsonResponse(response, status=200, safe=False)


@csrf_exempt
def get_all_patient_bills(_, patient_id):
    bills = Bill.objects.filter(invoiceId__patientId = patient_id)
    bills = BillSerializer(bills, many=True).data
    if len(bills)==0:
         return JsonResponse({"message":"bills not found"},status=404)
    return JsonResponse(bills, status=200, safe=False)

@csrf_exempt
@require_http_methods(["GET"])
def get_all_bills(request):
     bills = Bill.objects.all()
     serializer = BillSerializer(bills,many=True)
     if len(bills)==0:
         return JsonResponse({"message":" no bills found"},status=404) 
     return JsonResponse(serializer.data,safe=False)
    



