import styles from './AccountForm.module.css';

import React, { useState } from 'react';
import { Modal, InputField, Button } from '@labkhata/modules/shared/ui';
interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    initialBalance: 0,
    initialBalanceType: 'Debit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
        />
        <div>
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="asset">Asset</option>
            <option value="liability">Liability</option>
            <option value="equity">Equity</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <InputField
          label="Initial Balance"
          type="number"
          value={String(formData.initialBalance)}
          onChange={handleChange}
          name="initialBalance"
        />
        <div>
          <label htmlFor="initialBalanceType">Initial Balance Type</label>
          <select id="initialBalanceType" name="initialBalanceType" value={formData.initialBalanceType} onChange={handleChange} required>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <Button text="Create Account" />
      </form>
    </Modal>
  );
};

export default AccountForm;