from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    available_tickets = models.PositiveIntegerField(default=0)  # Field for ticket count
    status = models.CharField(
        max_length=20,
        choices=[
            ('upcoming', 'Upcoming'),
            ('ongoing', 'Ongoing'),
            ('completed', 'Completed')
        ],
        default='upcoming'
    )  # Field for event status

    def __str__(self):
        return self.title

    # Method to check ticket availability
    def has_available_tickets(self, requested_tickets):
        """Check if the requested number of tickets is available."""
        return self.available_tickets >= requested_tickets

    # Method to book tickets
    def book_tickets(self, requested_tickets):
        """Deduct tickets if available, otherwise raise an error."""
        if self.has_available_tickets(requested_tickets):
            self.available_tickets -= requested_tickets
            self.save()
            return True
        else:
            raise ValueError("Not enough tickets available.")
