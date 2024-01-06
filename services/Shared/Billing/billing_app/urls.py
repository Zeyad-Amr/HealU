from django.urls import path , include
from . import views

urlpatterns = [
    # invoice endpoints
    path('invoice', views.new_invoice, name='new_invoice'),
    path('invoice/<int:id>', views.handle_invoice, name='handle_invoice'),
    path('invoice/patient/<int:patient_id>', views.get_all_patient_invoices, name='get_all_patient_invoices'),
    path('invoices', views.get_all_invoices, name='get_all_invoices'),
    path('invoice/appointment/<str:appointment_id>', views.get_all_invoices_appointment, name='get_all_invoices_appointment'),
    # bill endpoints
     path('bill', views.new_bill, name="new_bill"),
    path('bill/<int:id>', views.handle_bill, name='handle_bill'),
    path('bill/patient/<int:patient_id>', views.get_all_patient_bills, name='get_all_patient_bills'),
     path('bills', views.get_all_bills, name='get_all_billss'),
   
                 ]