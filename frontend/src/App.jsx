import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider from './Context/Authcontext'; // Import AuthProvider
import Navbar from './components/Layout/Navbar/Navber'; // Fix typo in Navbar import
import Footer from './components/Layout/Footer/Footer'; // Include Footer 
import HomePage from './components/Pages/Homepage';
import EventList from './components/EventList/EventList'; // Add EventList component
import EventCard from './components/EventList/EventCard'; // Add EventCard component
import Login from './components/Pages/Login'; // Add Login component
import Register from './components/Pages/Register'; // Add Register component
import NotFound from './components/Pages/NotFound';
import BookingPage from './components/Pages/BookingPage';

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

const App = () => {
    return (
        <Router>
            <AuthProvider> {/* Ensure AuthProvider is wrapped inside Router */}
                {/* Navbar always at the top */}
                <Navbar />

                {/* Routes for main content */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventList />} /> {/* Add EventList route */}
                    <Route path="/create-event" element={<EventCard />} /> {/* Add EventCard route */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<RegisterAndLogout />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/events/:id/book" element={<BookingPage />} /> {/* Route with event ID */}
                </Routes>

                {/* Footer always at the bottom */}
                <Footer />
            </AuthProvider>
        </Router>
    );
};

export default App;
