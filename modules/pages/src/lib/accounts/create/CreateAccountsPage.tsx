import React, { useState } from 'react';
import { useCreateAccountMutation } from '@labkhata/store';
import { AccountForm } from '@labkhata/company';
import './CreateAccountsPage.module.css';
import { Button } from '@mui/material';

const CreateAccountsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createAccount, { isLoading, isError, error }] =
    useCreateAccountMutation();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (formData: any) => {
    try {
      await createAccount(formData).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to create account:', err);
    }
  };

  return (
    <div className="create-accounts-page">
      <h1>Create Account</h1>
      <Button variant="contained" onClick={handleOpenModal}>
        Create Account
      </Button>
      <AccountForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateAccountsPage;
