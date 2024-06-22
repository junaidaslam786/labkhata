import React from 'react';
import { useDispatch } from 'react-redux';
import { LoginForm } from '@labkhata/modules/authentication';
import { useLoginMutation } from '@labkhata/store';
import { setCredentials } from '@labkhata/store';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const user = await login(formData).unwrap();
      dispatch(setCredentials({ user, token: user.token }));
      localStorage.setItem('token', user.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;