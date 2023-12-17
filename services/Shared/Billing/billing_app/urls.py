from django.urls import path
from . import views

urlpatterns = [

    path('invoices', views.newinvoice, name='newinv'),
    path('invoices/<int:id>', views.handleinvoice, name='handle'),
    path('invoices/patient_id/<int:patient_id>', views.get_all_patient_invoices, name='all_patients_inv'),
                 ]