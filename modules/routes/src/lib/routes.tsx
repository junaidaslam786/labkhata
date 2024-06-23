import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompanyDashboardPage, LoginPage, RegisterPage } from '@labkhata/pages';
import { CreateCompany } from '@labkhata/company';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Use ProtectedRoute to protect the dashboard route */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<CompanyDashboardPage />} />
        <Route path="create-company" element={<CreateCompany />} />
      </Route>
        {/* Add other routes here */}
     
    </Routes>
  );
};

export default AppRoutes;