import React from 'react';
import { useDispatch } from 'react-redux';
import { RegisterForm } from '@labkhata/modules/authentication';
import { useRegisterMutation } from '@labkhata/store';
import { setCredentials } from '@labkhata/store';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = await register(formData).unwrap();
      dispatch(setCredentials({ user, token: user.token }));
      navigate('/login');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '98vw',
        height: '97vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RegisterForm onSubmit={handleRegister} />
    </Box>
  );
};

export default RegisterPage;
