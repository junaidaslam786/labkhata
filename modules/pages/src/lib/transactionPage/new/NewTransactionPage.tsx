import React from 'react';
import { NewTransaction } from '@labkhata/company';
import { Box } from '@mui/material';
import { useAddTransactionMutation } from '@labkhata/store';

export function NewTransactionPage() {
  const [addTransaction, { isLoading, isError, error }] =
    useAddTransactionMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await addTransaction(formData).unwrap();
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  return (
    <Box>
      <Box>
        <NewTransaction
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default NewTransactionPage;
