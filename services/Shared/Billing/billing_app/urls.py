from django.urls import path
from . import views

urlpatterns = [

    path('invoices/newinvoice', views.newinvoice, name='newinv'),
    path('invoices/<int:id>', views.delete, name='deleteinv'),
    path('invoices/patient_id/<int:patient_id>', views.get_all_patients, name='all_patients_inv'),

    ]