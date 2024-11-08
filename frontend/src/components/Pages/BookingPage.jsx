// src/components/BookingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventDetails, bookTickets } from '../../Services/bookingService';

const BookingPage = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1); // Default to 1 ticket
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getEventDetails(id);
                setEvent(response);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
                setErrorMessage('Event not found.');
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!token) {
            setErrorMessage('Please log in to book tickets.');
            navigate('/login');
            return;
        }

        if (numberOfTickets < 1) {
            setErrorMessage('Please enter a valid number of tickets.');
            return;
        }

        try {
            setPaymentSuccess(false); // Reset payment success before attempting booking
            await bookTickets(id, numberOfTickets, token);
            setPaymentSuccess(true);
            setErrorMessage('');
        } catch (error) {
            console.error('Booking failed:', error);
            if (error.response?.status === 403) {
                setErrorMessage('Authorization failed. Please log in again.');
                navigate('/login');
            } else {
                setErrorMessage('Failed to book tickets. Please try again.');
            }
        }
    };

    if (!event) return <div className="text-red-500 text-center">{errorMessage || 'Loading event details...'}</div>;

    return (
        <div className="booking-page p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Book Tickets for {event.title}</h2>

            <div className="event-details bg-gray-100 p-4 rounded shadow-md mb-6">
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Price per Ticket:</strong> ${event.ticket_price.toFixed(2)}</p>
                <p><strong>Total Amount:</strong> ${(event.ticket_price * numberOfTickets).toFixed(2)}</p>
            </div>

            <form onSubmit={handleBooking} className="bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="numberOfTickets" className="block text-sm font-medium">Number of Tickets:</label>
                    <input
                        type="number"
                        id="numberOfTickets"
                        value={numberOfTickets}
                        onChange={(e) => setNumberOfTickets(Math.max(1, Number(e.target.value)))}
                        min="1"
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {token ? "Pay Now" : "Please log in to book tickets"}
                </button>
            </form>

            {paymentSuccess && (
                <div className="mt-4 text-green-600 text-center">
                    Payment Successful! Thank you for your booking.
                </div>
            )}

            {errorMessage && (
                <div className="mt-4 text-red-600 text-center">
                    {errorMessage}
                </div>
            )}

            <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline text-center block">
                Back to Events
            </button>
        </div>
    );
};

export default BookingPage;
