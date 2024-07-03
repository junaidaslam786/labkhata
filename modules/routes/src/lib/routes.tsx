import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  CreateCompany,
  Dashboard,
  CreateAccountsPage,
  NewTransactionPage,
  NewContactPage,
  TransactionPage,
  ContactPage,
} from '@labkhata/pages';
import ProtectedRoute from './ProtectedRoute';
import { AdminLayout } from '@labkhata/layouts';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/create-company" element={<CreateCompany />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route
            path="/admin/accounts/create"
            element={<CreateAccountsPage />}
          />
          <Route
            path="/admin/transactions/new"
            element={<NewTransactionPage />}
          />
          <Route
            path="/admin/transactions"
            element={<TransactionPage />}
          />
          <Route
            path="/admin/contacts/new"
            element={<NewContactPage />}
          />
          <Route
            path="/admin/contacts"
            element={<ContactPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
