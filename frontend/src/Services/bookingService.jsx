// src/Services/bookingService.js
import axios from 'axios';

// Define the base URL of your Django API for booking
const API_URL = 'http://127.0.0.1:8000/api/events/';

// Fetch event details
export const getEventDetails = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}${eventId}/`);
        return response.data; // Ensure the response structure is correct
    } catch (error) {
        console.error('Error fetching event details:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Book tickets for an event
export const bookTickets = async (eventId, numberOfTickets, token) => {
    try {
        const response = await axios.post(
            `${API_URL}${eventId}/book/`,
            { tickets: numberOfTickets },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data; // Return the response if needed
    } catch (error) {
        console.error('Error booking tickets:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
