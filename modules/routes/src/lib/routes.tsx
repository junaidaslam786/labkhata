import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, CreateCompany, Dashboard, CreateAccountsPage } from '@labkhata/pages';
import ProtectedRoute from './ProtectedRoute';
import { MainLayout, AdminLayout } from '@labkhata/layouts';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    
    <Route element={<MainLayout />}>
      <Route path="/create-company" element={<CreateCompany />} />
    </Route>
    
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
       <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/accounts/create" element={<CreateAccountsPage />} /> 
      </Route>
    </Route>
  </Routes>
  );
};

export default AppRoutes;
