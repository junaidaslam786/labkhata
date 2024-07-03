export interface Company {
  id: number;
  user_id: number;
  name: string;
  address: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier';
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier';
  companyId: number;
}

export interface UpdateContactDto {
  name?: string;
  email?: string;
  phone?: string;
  type?: 'customer' | 'supplier';
  companyId?: number;
}
