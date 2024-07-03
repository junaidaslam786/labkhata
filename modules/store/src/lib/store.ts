import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from './services/api/auth.api';
import { companyApi } from './services/api/company.api';
import { accountApi } from './services/api/accounts.api';
import { userApi } from './services/api/user.api';
import { transactionApi } from './services/api/transaction.api';
import authReducer from './services/auth.slice';
import companyReducer from './services/company.slice';
import userReducer from './services/user.slice';
import transactionReducer from './services/transaction.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
    transaction: transactionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, companyApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
