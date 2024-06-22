import React from 'react';
import { useDispatch } from 'react-redux';
import { RegisterForm } from '@labkhata/modules/authentication';
import { useRegisterMutation } from '@labkhata/store';
import { setCredentials } from '@labkhata/store';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (formData: { username: string; email: string; password: string }) => {
    try {
      const user = await register(formData).unwrap();
      dispatch(setCredentials({ user, token: user.token }));
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;