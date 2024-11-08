from django.urls import path
from .views import get_events,create_events,CreateUserView,book_ticket

urlpatterns = [
    path('events/',get_events,name='get_events'),
    path('events/create/',create_events,name='create_events'),
    path('auth/register/', CreateUserView.as_view(), name='register'),  # Registration endpoint
    path('events/<int:event_id>/book/', book_ticket, name='book_ticket'),



]
