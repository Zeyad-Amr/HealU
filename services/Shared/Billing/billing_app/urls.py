from django.urls import path
from . import views

urlpatterns = [

    path('invoice', views.new_invoice, name='new_invoice'),
    path('invoice/<int:id>', views.handle_invoice, name='handle_invoice'),
    path('invoice/patient/<int:patient_id>', views.get_all_patient_invoices, name='get_all_patient_invoices'),
                 ]