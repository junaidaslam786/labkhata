import React from 'react';
import { useCreateCompanyMutation } from '@labkhata/store';
import { CreateCompanyComponent } from '@labkhata/company';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCompany.module.css';

const CreateCompany: React.FC = () => {
  const [createCompany] = useCreateCompanyMutation();
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    name: string;
    address: string;
    industry: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      await createCompany({ companyData: formData }).unwrap();
      alert('Company created successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to create company', error);
      alert('Failed to create company');
    }
  };

  return (
    <div className={styles['container']}>
      <CreateCompanyComponent onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCompany;
