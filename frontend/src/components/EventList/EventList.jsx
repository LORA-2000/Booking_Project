// src/components/EventList/EventList.jsx
import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents } from '../../Services/eventService'; // Fetch events from API

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events when the component mounts
        getEvents()
            .then((data) => {
                const modifiedEvents = data.map(event => ({
                    ...event,
                    ticket_price: Number(event.ticket_price), // Ensure ticket_price is a number
                }));
                setEvents(modifiedEvents);
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="event-list">
            {events.length > 0 ? (
                events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))
            ) : (
                <p>No events found</p>
            )}
        </div>
    );
};

export default EventList;
