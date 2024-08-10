from django.urls import path
from .views import *

urlpatterns = [
    path('inventory/',ProductCreateView.as_view(),name='Inventory-list-create-view'),
    path('inventory/<int:pk>/',ProductDetailView.as_view(),name='Inventory-detail-view'),
]