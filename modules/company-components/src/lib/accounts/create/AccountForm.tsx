import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { Modal } from '@labkhata/modules/shared/ui';

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
}

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
  });

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
          value={String(formData.initialBalance)}
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
        <Button type="submit" variant="contained" color="primary">
          Create Account
        </Button>
      </form>
    </Modal>
  );
};

export default AccountForm;
