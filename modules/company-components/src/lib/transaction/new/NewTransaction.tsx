import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useGetUserQuery, useFetchAccountsQuery } from '@labkhata/store';

interface JournalEntry {
  accountId: number;
  debit: number;
  credit: number;
}

interface TransactionFormData {
  date: string;
  amount: number;
  description: string;
  companyId: number;
  journalEntries: JournalEntry[];
}

interface NewTransactionProps {
  onSubmit: (formData: {
    date: string;
    amount: number;
    description: string;
    companyId: number;
    journalEntries: JournalEntry[];
  }) => void;
  initialData?: TransactionFormData;
}

const NewTransaction: React.FC<NewTransactionProps> = ({ onSubmit, initialData }) => {
  const { data: accounts, isLoading, error } = useFetchAccountsQuery();
  const { data: user } = useGetUserQuery();
  const [formData, setFormData] = useState<TransactionFormData>({
    date: initialData?.date || '',
    amount: initialData?.amount || 0,
    description: initialData?.description || '',
    companyId: initialData?.companyId || 0,
    journalEntries: initialData?.journalEntries || [
      {
        accountId: 0,
        debit: 0,
        credit: 0,
      },
    ],
  });

  useEffect(() => {
    if (user && user.company && !initialData) {
      setFormData((prevData) => ({
        ...prevData,
        companyId: user.company.id,
      }));
    }
  }, [user, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseInt(value) : value,
    });
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      journalEntries: [
        {
          ...prevData.journalEntries[0],
          accountId: parseInt(value, 10),
        },
      ],
    }));
  };

  const handleDebitClick = () => {
    const updatedFormData = {
      ...formData,
      journalEntries: [
        {
          ...formData.journalEntries[0],
          debit: formData.amount,
          credit: 0,
        },
      ],
    };
    handleSubmit(updatedFormData);
  };

  const handleCreditClick = () => {
    const updatedFormData = {
      ...formData,
      journalEntries: [
        {
          ...formData.journalEntries[0],
          credit: formData.amount,
          debit: 0,
        },
      ],
    };
    handleSubmit(updatedFormData);
  };

  const handleSubmit = (data: TransactionFormData) => {
    onSubmit(data);
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    const errorMessage =
      'status' in error
        ? `Error fetching contacts: ${error.status}`
        : error.message;

    return (
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          New Transaction
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="accountId"
            name="accountId"
            label="Account ID"
            value={formData.journalEntries[0].accountId}
            onChange={handleAccountChange}
          >
            {accounts?.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDebitClick}
            >
              Debit
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleCreditClick}
            >
              Credit
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewTransaction;
