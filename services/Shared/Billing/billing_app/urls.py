from django.urls import path
from . import views
urlpatterns = [
    path('bill', views.new_bill, name="new_bill"),
    path('bill/<int:id>', views.handle_bill, name='handle_bill'),
    path('bill/patient/<int:patient_id>', views.get_all_patient_bills, name='get_all_patient_bills'),
]