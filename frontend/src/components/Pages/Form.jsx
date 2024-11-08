import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Form = ({ title, onSubmit, hasEmail, showRegisterLink }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ username, password, email });
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/src/assets/images/event-hero4.jpg')] backdrop-blur-md">
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl w-full max-w-sm transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 pl-10 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-3.5 text-blue-500"
            />
          </div>

          {hasEmail && (
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 pl-10 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3.5 text-green-500"
              />
            </div>
          )}

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pl-10 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <FontAwesomeIcon
              icon={faKey}
              className="absolute left-3 top-3.5 text-purple-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-full font-semibold hover:from-purple-600 hover:to-blue-700 transition duration-300"
          >
            {title}
          </button>
        </form>

        {showRegisterLink && (
          <p className="pt-4 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-700 transition duration-200">
              Create New
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hasEmail: PropTypes.bool,
  showRegisterLink: PropTypes.bool,
};

export default Form;
