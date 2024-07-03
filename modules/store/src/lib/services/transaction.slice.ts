import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalEntry {
  accountId: number;
  debit: number;
  credit: number;
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
  companyId: number;
  journalEntries: JournalEntry[];
}

interface TransactionState {
  transaction: Transaction | null;
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transaction: null,
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction = action.payload;
    },
    clearTransaction: (state) => {
      state.transaction = null;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  setTransaction,
  clearTransaction,
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
