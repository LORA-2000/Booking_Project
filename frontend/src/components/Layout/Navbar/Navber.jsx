// src/components/Layout/Navbar/Navbar.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // Call the onSearch function passed from parent (HomePage)
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav
            className="text-white p-4 shadow-md sticky top-0 z-50"
            style={{
                background: 'linear-gradient(to right, rgba(234, 179, 8), rgba(17, 14, 26, 0.8))',
            }}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-lg font-bold flex items-center space-x-2">
                    <Link to="/" className="text-white text-2xl">
                        <span className="text-purple-600">Event</span> Manager
                    </Link>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-grow mx-4 relative">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search events..."
                        className="w-full pl-10 p-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Right: Login/Signup and User Profile */}
                <div className="flex items-center space-x-4">
                    {/* Login/SignUp Links */}
                    <Link
                        to="/login"
                        className="border rounded-xl text-sm font-semibold p-2 hover:bg-purple-600 duration-500"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className="border rounded-xl text-sm font-semibold p-2 hover:bg-green-600 duration-500"
                    >
                        Sign Up
                    </Link>

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="border rounded-full text-sm font-semibold p-2 hover:bg-yellow-600 duration-500"
                        >
                            <FontAwesomeIcon icon={faUser} className="text-white" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-10">
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-sm  rounded-md  hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    View Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-sm  rounded-md  hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                                    Settings
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Prop validation
Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Ensure onSearch is passed as a function
};

export default Navbar;
