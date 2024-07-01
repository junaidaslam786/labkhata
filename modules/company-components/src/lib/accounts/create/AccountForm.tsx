import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { Modal } from '@labkhata/modules/shared/ui';
import { getDecodedToken } from '@labkhata/Utils';

interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountFormData) => void;
}

interface AccountFormData {
  name: string;
  type: string;
  initialBalance: number;
  initialBalanceType: string;
  companyId: number;
}

const API_URL = process.env.NX_BACKEND_API_URL;

const AccountForm: React.FC<AccountFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AccountFormData>({
    name: '',
    type: '',
    initialBalance: 0,
    initialBalanceType: 'Debit',
    companyId: 0,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = getDecodedToken();
        const userId = token?.id;
        const response = await fetch(`${API_URL}/company/${userId}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user details: ${response.statusText}`
          );
        }

        const userData = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          companyId: userData.companyId,
        }));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (isOpen) {
      fetchUserDetails();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box sx={{ width: '50vw', height: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleSelectChange}
              label="Type"
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="asset">Asset</MenuItem>
              <MenuItem value="liability">Liability</MenuItem>
              <MenuItem value="equity">Equity</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Initial Balance"
            type="number"
            value={formData.initialBalance}
            onChange={handleInputChange}
            name="initialBalance"
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="initialBalanceType-label">
              Initial Balance Type
            </InputLabel>
            <Select
              labelId="initialBalanceType-label"
              id="initialBalanceType"
              name="initialBalanceType"
              value={formData.initialBalanceType}
              onChange={handleSelectChange}
              label="Initial Balance Type"
            >
              <MenuItem value="Debit">Debit</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '2vh' }}
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AccountForm;
