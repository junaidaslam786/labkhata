import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDecodedToken } from '@labkhata/Utils';

interface Company {
  id: string;
  name: string;
  address: string;
  industry: string;
}

interface CompanyCreateRequest {
  name: string;
  address: string;
  industry: string;
}

interface DecodedToken {
  id: number;
  name: string;
  email: string;
}

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createCompany: builder.mutation<
      Company,
      { companyData: CompanyCreateRequest }
    >({
      query: ({ companyData }) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const decodedToken = getDecodedToken();
        const userId = decodedToken?.id;
        return {
          url: `company/${userId}`,
          method: 'POST',
          body: companyData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCompany: builder.query<Company, string>({
      query: (companyId) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          url: `company/${companyId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateCompanyMutation, useGetCompanyQuery } = companyApi;
