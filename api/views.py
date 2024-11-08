from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from .models import Event
from .serializers import EventSerializer, UserSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny

# User Registration View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Public endpoint for user registration

# Get Events View with Optional Search Query
@api_view(['GET'])
def get_events(request):
    query = request.GET.get('q')  # Optional search query
    events = Event.objects.all()
    
    if query:
        events = events.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query) |
            Q(date__icontains=query)
        )

    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

# Create Event View (Admin-Only Access)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_events(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Book Ticket for Event
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_ticket(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        requested_tickets = request.data.get('tickets', 1)
        
        # Ensure requested_tickets is a valid positive integer
        if not isinstance(requested_tickets, int) or requested_tickets <= 0:
            return Response({'error': 'Invalid number of tickets'}, status=status.HTTP_400_BAD_REQUEST)

        if event.has_available_tickets(requested_tickets):
            event.available_tickets -= requested_tickets
            event.save()
            return Response({'message': 'Tickets booked successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Not enough tickets available'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
