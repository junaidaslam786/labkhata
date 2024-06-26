import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, CreateCompany } from '@labkhata/pages';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/create-company" element={<CreateCompany />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
