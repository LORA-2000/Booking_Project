// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAdmin } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user || (adminOnly && !isAdmin)) {
        return <Navigate to="/login" />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    adminOnly: PropTypes.bool,
};

export default PrivateRoute;
