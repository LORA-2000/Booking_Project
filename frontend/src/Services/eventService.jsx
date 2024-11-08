import axios from 'axios';

// Define the base URL of your Django API
const API_URL = 'http://127.0.0.1:8000/api/events/';

// Fetch all events from the backend
export const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Ensure the response structure is correct
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; // Consider handling different error cases here
    }
};

// Create a new event (only for admin use)
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}create/`, eventData);
        return response.data; // Ensure the response structure is correct
    } catch (error) {
        console.error('Error creating event:', error);
        throw error; // Consider handling different error cases here
    }
};

// Fetch events with optional search query (for search functionality)
export const fetchEvents = async (query = '') => {
    try {
        // If a query exists, include it in the GET request
        const response = await axios.get(`${API_URL}?q=${query}`);
        return response.data; // Ensure the response structure is correct
    } catch (error) {
        console.error('Error fetching events:', error);
        return []; // Returning an empty array on error
    }
};

