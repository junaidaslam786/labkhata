import React from 'react';
import { Box } from '@mui/material';
import { useFetchAccountsQuery } from '@labkhata/store';
import { Accounts } from '@labkhata/company';

export function AccountsPage() {
  const { data: accounts, isLoading, error } = useFetchAccountsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Accounts</div>;
  }

  if (!accounts) {
    return <div>No Accounts available</div>;
  }

  const formattedAccounts = accounts.map((account: any, index: number) => ({
    id: index + 1,
    name: account.name,
    type: account.type,
    initialBalance: account.initialBalance,
    initialBalanceType: account.initialBalanceType,
  }));

  return (
    <Box>
      <Accounts rows={formattedAccounts} />
    </Box>
  );
}

export default AccountsPage;
