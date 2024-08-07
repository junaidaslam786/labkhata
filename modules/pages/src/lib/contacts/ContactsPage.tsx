import React from 'react';
import { Box } from '@mui/material';
import { useFetchContactsQuery } from '@labkhata/store';
import { Contacts } from '@labkhata/company';

export function ContactsPage() {
  const { data: contacts, isLoading, error } = useFetchContactsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading contacts, try to log in again</div>;
  }

  if (!contacts) {
    return <div>No contacts available</div>;
  }

  const formattedContacts = contacts.map((contact: any, index: number) => ({
    id: index + 1,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    type: contact.type,
  }));

  return (
    <Box>
      <Contacts rows={formattedContacts} />
    </Box>
  );
}

export default ContactsPage;
