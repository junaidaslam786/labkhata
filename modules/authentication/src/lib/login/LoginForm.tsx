import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { Button, InputField } from '@labkhata/modules/shared/ui';



interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
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
      <h2 className={styles.title}>Login</h2>
      <InputField
        label="Email"
        type="text"
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
      <Button text="Login" />
    </form>
  );
};

export default LoginForm;
