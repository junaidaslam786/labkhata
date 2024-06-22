import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from './InputField';

describe('InputField Component', () => {
  const mockOnChange = vi.fn();

  const props = {
    label: 'Test Label',
    type: 'text',
    value: 'Test Value',
    onChange: mockOnChange,
    name: 'testName',
  };

  it('should render the label correctly', () => {
    render(<InputField {...props} />);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).not.toBeNull();
    expect(labelElement.tagName).toBe('LABEL');
  });

  it('should render the input with correct type and value', () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).not.toBeNull();
    expect(inputElement.value).toBe('Test Value');
    expect(inputElement.type).toBe('text');
  });

  it('should call onChange function when input value changes', () => {
    const TestComponent = () => {
      const [value, setValue] = useState('Test Value');
      return (
        <InputField
          label="Test Label"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            mockOnChange(e);
          }}
          name="testName"
        />
      );
    };

    render(<TestComponent />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    
    // Simulate the change event on the input element
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    // Expect the onChange handler to have been called once
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    // Log the call arguments for debugging
    // console.log(mockOnChange.mock.calls);

    // Expect the first call to have the new value as target.value
    const callArgs = mockOnChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>;
    expect(callArgs.target.value).toBe('New Value');
  });
});