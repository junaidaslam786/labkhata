import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NX_BACKEND_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

export default baseQuery;