// src/pages/HomePage.jsx
import EventList from '../../components/EventList/EventList';
import HeroImg from '../../assets/images/event-hero3.jpg'; // Import the hero image
import { Link } from 'react-router-dom';



const HomePage = () => {
    return (
        <div className="relative">
            {/* Parent div with the background image */}
            <div
                className="relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HeroImg})` }} // Apply the background image
            >
               
               {/* Hero Section */}
                <section className="hero-section relative flex items-center justify-center bg-black bg-opacity-50 h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
                    {/* Gradient overlay to improve readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black opacity-60"></div>

                    {/* Hero content */}
                    <div className="relative z-10 text-center text-white px-4 md:px-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide transform transition-all duration-500 ease-in-out hover:scale-105">
                            Your Gateway to <p className='text-yellow-400 text-7xl pt-5'>Unforgettable Events !</p>
                        </h1>
                        <p className="text-lg md:text-2xl mt-4 md:mt-6 max-w-2xl mx-auto text-shadow-md">
                            Find the best events near you and stay up-to-date with exciting activities happening all around!
                        </p>
                        <div className="mt-6 pt-5">
                            <Link 
                                to="/events" 
                                className="bg-purple-500 text-white py-3 px-8 font-semibold rounded-lg text-xl hover:bg-purple-700 transition duration-300"
                            >
                                Explore Events &gt;&gt;
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            {/* Upcoming Events Section */}
           
            <section className="event-list-section mt-10 mx-6 md:mx-16 py-8 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
                    Upcoming Events
                </h2>
                <div>
                    {/* Pass the events array to the EventList */}
                    <EventList/>
                </div>
            </section>
           
           
            
            {/* Footer */}
         
        </div>
    );
};

export default HomePage;
