import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from './services/api/auth.api';
import { companyApi } from './services/api/company.api';
import authReducer from './services/auth.slice';
import companyReducer from './services/company.slice';
import { accountApi } from './services/api/accounts.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, companyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
