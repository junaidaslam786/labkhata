
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './customFetchBase';
import { Contact, CreateContactDto, UpdateContactDto } from '@labkhata/types';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery,
  endpoints: (builder) => ({
    createContact: builder.mutation<Contact, CreateContactDto>({
      query: (newContact) => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
    }),
    fetchContacts: builder.query<Contact[], void>({
      query: () => ({
        url: 'contacts',
        method: 'GET',
      }),
    }),
    fetchContactById: builder.query<Contact, number>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: 'GET',
      }),
    }),
    updateContact: builder.mutation<Contact, { id: number; updateContactDto: UpdateContactDto }>({
      query: ({ id, updateContactDto }) => ({
        url: `contacts/${id}`,
        method: 'PUT',
        body: updateContactDto,
      }),
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useFetchContactsQuery,
  useFetchContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
