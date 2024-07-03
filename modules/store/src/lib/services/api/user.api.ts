import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDecodedToken } from '@labkhata/Utils';
import baseQuery from './customFetchBase';

interface Company {
  id: number;
  user_id: number;
  name: string;
  address: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  company: Company;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const decodedToken = getDecodedToken();
        const userId = decodedToken?.id;
        return {
          url: `auth/user/${userId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
