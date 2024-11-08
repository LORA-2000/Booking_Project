from django.contrib import admin
from .models import Event

# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'date', 'ticket_price')  # Columns to display in the admin panel
    search_fields = ('title', 'location')  # Searchable fields in admin

# Or alternatively, without using @admin.register
# admin.site.register(Event, EventAdmin)
