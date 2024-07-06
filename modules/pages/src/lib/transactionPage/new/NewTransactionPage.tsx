import React from 'react';
import { NewTransaction } from '@labkhata/company';
import { Box } from '@mui/material';
import { useAddTransactionMutation } from '@labkhata/store';
import { useNavigate, useLocation } from 'react-router-dom';

export function NewTransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [addTransaction] = useAddTransactionMutation();
  const transaction = location.state?.transaction || null;

  const handleSubmit = async (formData: any) => {
    try {
      await addTransaction(formData).unwrap();
      navigate('/admin/transactions');
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  return (
    <Box>
      <Box>
        <NewTransaction onSubmit={handleSubmit} initialData={transaction} />
      </Box>
    </Box>
  );
}

export default NewTransactionPage;
