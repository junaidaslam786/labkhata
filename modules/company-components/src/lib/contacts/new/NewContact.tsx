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
import { useGetUserQuery } from '@labkhata/store';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier';
  companyId: number;
}

interface NewContactProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    type: 'customer' | 'supplier';
    companyId: number;
  }) => void;
}

const NewContact: React.FC<NewContactProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    type: 'customer',
    companyId: 0,
  });

  const { data: user } = useGetUserQuery();
  
  useEffect(() => {
    if (user && user.company) {
      setFormData((prevData) => ({
        ...prevData,
        companyId: user.company.id,
      }));
    }
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box>
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
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          name="phone"
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            label="Type"
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="supplier">Supplier</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '2vh' }}
        >
          Create Contact
        </Button>
      </form>
    </Box>
  );
};

export default NewContact;
