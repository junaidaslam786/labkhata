import { useState } from 'react';
import styles from './CreateCompanyComponent.module.css';
import { InputField, Button } from '@labkhata/modules/shared/ui';

interface CreateCompanyComponentProps {
  onSubmit: (formData: {
    name: string;
    address: string;
    industry: string;
  }) => void;
}

const CreateCompanyComponent: React.FC<CreateCompanyComponentProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    industry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register Company</h2>
      <InputField
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        name="name"
      />
      <InputField
        label="Address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        name="address"
      />
      <InputField
        label="Industry"
        type="text"
        value={formData.industry}
        onChange={handleChange}
        name="industry"
      />
      <Button text="Register Company" />
    </form>
  );
};

export default CreateCompanyComponent;
