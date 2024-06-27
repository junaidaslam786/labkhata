// libs/store/src/lib/types.ts

export interface Account {
    id: number;
    name: string;
    type: string;
    initialBalance: number;
    initialBalanceType: 'Debit' | 'Credit';
    company: Company;
    journalEntries: JournalEntry[];
    contact: Contact;
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
  
  export interface Company {
    id: number;
    name: string;
  }
  
  export interface JournalEntry {
    id: number;
    debit: number;
    credit: number;
  }
  
  export interface Contact {
    id: number;
    name: string;
  }
  