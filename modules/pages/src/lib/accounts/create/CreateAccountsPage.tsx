import React, { useState } from 'react';
import { useCreateAccountMutation } from '@labkhata/store';
import { AccountForm } from '@labkhata/company';
import { Button } from '@labkhata/modules/shared/ui';
import './CreateAccountsPage.module.css';

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
      <Button text="Create Account" onClick={handleOpenModal} />
      <AccountForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      {isLoading && <p>Loading...</p>}
      {/* {isError && <p className="error">Error: {error?.data?.message || 'Failed to create account'}</p>} */}
    </div>
  );
};

export default CreateAccountsPage;
