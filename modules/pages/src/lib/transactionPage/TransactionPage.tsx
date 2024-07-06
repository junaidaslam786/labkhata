import React from 'react';
import { Box } from '@mui/material';
import { useGetTransactionsQuery } from '@labkhata/store';
import { Transaction } from '@labkhata/company';

export function TransactionPage() {
  const { data: transactions, isLoading, error } = useGetTransactionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading transactions, try to log in again</div>;
  }

  if (!transactions) {
    return <div>No transactions available</div>;
  }

  const formattedTransactions = transactions.map((transaction: any, index: number) => {
    const journalEntry = transaction.journalEntries && transaction.journalEntries[0];
    return {
      id: index + 1,
      name: journalEntry ? journalEntry.account.name : 'N/A',
      amount: transaction.amount,
      debit: journalEntry ? journalEntry.debit : 'N/A',
      credit: journalEntry ? journalEntry.credit : 'N/A',
    };
  });

  return (
    <Box>
      <Transaction rows={formattedTransactions} />
    </Box>
  );
}

export default TransactionPage;
