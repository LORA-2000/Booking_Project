// src/pages/Register.jsx
import { register } from '../../Services/authService';
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async ({ username, password, email }) => {
    await register(username, email, password);
    alert('Registration successful!');
    navigate('/login');
  };

  return <Form title="Register" onSubmit={handleRegister} hasEmail />;
};

export default Register;
