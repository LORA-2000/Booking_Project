import { login } from '../../Services/authService';
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    await login(username, password);
    alert('Login successful!');
    navigate('/');
  };

  return (
    <div>
      <Form title="Login" onSubmit={handleLogin} showRegisterLink={true} />
    </div>
  );
};

export default Login;
