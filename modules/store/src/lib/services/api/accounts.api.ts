// libs/store/src/lib/account.api.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './customFetchBase';
import { Account, CreateAccountDto, UpdateAccountDto, UpdateInitialBalanceDto } from '@labkhata/types';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery,
  endpoints: (builder) => ({
    createAccount: builder.mutation<Account, CreateAccountDto>({
      query: (newAccount) => ({
        url: 'accounts',
        method: 'POST',
        body: newAccount,
      }),
    }),
    fetchAccounts: builder.query<Account[], void>({
      query: () => ({
        url: 'accounts',
        method: 'GET',
      }),
    }),
    fetchAccountById: builder.query<Account, number>({
      query: (id) => ({
        url: `accounts/${id}`,
        method: 'GET',
      }),
    }),
    updateAccount: builder.mutation<Account, { id: number; updateAccountDto: UpdateAccountDto }>({
      query: ({ id, updateAccountDto }) => ({
        url: `accounts/${id}`,
        method: 'PUT',
        body: updateAccountDto,
      }),
    }),
    updateInitialBalance: builder.mutation<Account, { id: number; updateInitialBalanceDto: UpdateInitialBalanceDto }>({
      query: ({ id, updateInitialBalanceDto }) => ({
        url: `accounts/${id}/initial-balance`,
        method: 'PUT',
        body: updateInitialBalanceDto,
      }),
    }),
    deleteAccount: builder.mutation<void, number>({
      query: (id) => ({
        url: `accounts/${id}`,
        method: 'DELETE',
      }),
    }),
    getAccountJournalEntries: builder.query<any, number>({
      query: (id) => ({
        url: `accounts/${id}/journal-entries`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useFetchAccountsQuery,
  useFetchAccountByIdQuery,
  useUpdateAccountMutation,
  useUpdateInitialBalanceMutation,
  useDeleteAccountMutation,
  useGetAccountJournalEntriesQuery,
} = accountApi;
