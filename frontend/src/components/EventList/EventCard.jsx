// src/components/EventList/EventCard.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    // Navigate to the booking page for the event
    const handleBookTicket = () => {
        navigate(`/events/${event.id}/book/`);
    };

    return (
      
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 m-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{event?.title || "Event Title"}</h2>
        <p className="text-gray-700 text-lg mb-4">{event?.description || "No description available"}</p>
        <p className="text-gray-500 italic mb-2">{event?.location || "No location provided"}</p>
        <p className="text-gray-500 text-sm mb-4">{event?.date ? new Date(event.date).toLocaleDateString() : "Date not available"}</p>
        <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-purple-600">${event?.ticket_price?.toFixed(2) || "0.00"}</p>
            <button 
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={handleBookTicket}
            >
                Book Ticket
            </button>
        </div>
    </div>
    
      
      
      
      
      
      
      
      
      
      
      
    );
};

// PropTypes for validation
EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        ticket_price: PropTypes.number.isRequired,
    }).isRequired,
};

export default EventCard;
