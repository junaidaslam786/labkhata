// libs/store/src/lib/types.ts

export interface Account {
    id: number;
    name: string;
    type: string;
    initialBalance: number;
    initialBalanceType: 'Debit' | 'Credit';
    company: Companies;
    journalEntries: JournalEntry[];
    contact: Contacts;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateAccountDto {
    name: string;
    type: string;
    initialBalance: number;
    initialBalanceType: 'Debit' | 'Credit';
    companyId: number;
    contactId: number;
  }
  
  export interface UpdateAccountDto {
    name?: string;
    type?: string;
    initialBalance?: number;
    initialBalanceType?: 'Debit' | 'Credit';
    companyId?: number;
    contactId?: number;
  }
  
  export interface UpdateInitialBalanceDto {
    initialBalance: number;
    initialBalanceType: 'Debit' | 'Credit';
  }
  
  export interface Companies {
    id: number;
    name: string;
  }
  
  export interface JournalEntry {
    id: number;
    debit: number;
    credit: number;
  }
  
  export interface Contacts {
    id: number;
    name: string;
  }
  