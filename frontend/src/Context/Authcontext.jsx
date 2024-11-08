import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

// Define API endpoint and token keys
const API_URL = 'http://127.0.0.1:8000/api/auth/';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                try {
                    const { default: jwt_decode } = await import('jwt-decode');
                    const decoded = jwt_decode(token);
                    setUser(decoded);
                    setIsAdmin(decoded?.isAdmin || false);
                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}token/`, { username, password });
            const { access, refresh } = response.data;

            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            updateUserState(access);

            return true;
        } catch (error) {
            console.error('Login error:', error.response?.data || error);
            return false;
        }
    };

    const updateUserState = async (token) => {
        try {
            const { default: jwt_decode } = await import('jwt-decode');
            const decoded = jwt_decode(token);
            setUser(decoded);
            setIsAdmin(decoded?.isAdmin || false);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setUser(null);
        setIsAdmin(false);
        navigate('/login');
    };

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
            return logout(); // Logout if no refresh token found
        }

        try {
            const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
            const newAccessToken = response.data.access;
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
            await updateUserState(newAccessToken);
        } catch (error) {
            console.error('Error refreshing token:', error.response?.data || error);
            logout(); // Logout on error
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
