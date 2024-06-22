import { useState } from 'react';
import styles from './RegisterForm.module.css';
import { InputField, Button } from '@labkhata/modules/shared/ui';

interface RegisterFormProps {
  onSubmit: (formData: { username: string; email: string; password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
      <h2 className={styles.title}>Register</h2>
      <InputField
        label="Username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        name="username"
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        name="email"
      />
      <InputField
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        name="password"
      />
      <Button text="Register" />
    </form>
  );
};

export default RegisterForm;