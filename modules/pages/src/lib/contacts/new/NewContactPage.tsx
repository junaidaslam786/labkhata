import React from 'react';
import { NewContact } from '@labkhata/company';
import { Box } from '@mui/material';
import { useCreateContactMutation } from '@labkhata/store';
import { useNavigate } from 'react-router-dom';

const NewContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [createContact, { isLoading, isError, error }] =
    useCreateContactMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await createContact(formData).unwrap();
      console.log('Contact created successfully!');
      navigate('/admin/contacts');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box>
      <NewContact onSubmit={handleSubmit} />
    </Box>
  );
};

export default NewContactPage;
