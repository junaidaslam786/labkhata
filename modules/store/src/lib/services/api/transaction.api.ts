import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './customFetchBase';

interface JournalEntry {
  accountId: number;
  debit: number;
  credit: number;
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
  companyId: number;
  journalEntries: JournalEntry[];
}

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery,
  endpoints: (builder) => ({
    getTransaction: builder.query<Transaction, number>({
      query: (transactionId) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: `transactions/${transactionId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: 'transactions',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    addTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: (newTransaction) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: 'transactions',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: newTransaction,
        };
      },
    }),
    updateTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: ({ id, ...updatedTransaction }) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: `transactions/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: updatedTransaction,
        };
      },
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: (transactionId) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: `transactions/${transactionId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
