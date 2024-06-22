import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompanyDashboardPage, LoginPage, RegisterPage } from '@labkhata/pages';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<CompanyDashboardPage />} />
        {/* Add other routes here */}
     
    </Routes>
  );
};

export default AppRoutes;