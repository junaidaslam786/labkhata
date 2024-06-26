import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Company {
  name: string;
  address: string;
  industry: string;
}

interface CompanyState {
  companies: Company[];
}

const initialState: CompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<{ index: number; company: Company }>) => {
      state.companies[action.payload.index] = action.payload.company;
    },
    removeCompany: (state, action: PayloadAction<number>) => {
      state.companies.splice(action.payload, 1);
    },
  },
});

export const { addCompany, updateCompany, removeCompany } = companySlice.actions;

export default companySlice.reducer;
