import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, name }) => {
  const id = `input-${name}`;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputField;