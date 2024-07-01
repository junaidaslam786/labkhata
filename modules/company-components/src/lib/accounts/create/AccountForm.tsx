import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { Modal } from '@labkhata/modules/shared/ui';

interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    initialBalance: 0,
    initialBalanceType: 'Debit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      initialBalanceType: event.target.value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
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
            onChange={handleChange}
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
          value={String(formData.initialBalance)}
          onChange={handleChange}
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
        <Button type="submit" variant="contained" color="primary">
          Create Account
        </Button>
      </form>
    </Modal>
  );
};

export default AccountForm;
