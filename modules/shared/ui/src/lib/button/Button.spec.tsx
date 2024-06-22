
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  const mockOnClick = vi.fn();

  const props = {
    text: 'Click Me',
    onClick: mockOnClick,
  };

  it('should render the button with correct text', () => {
    render(<Button {...props} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.textContent).toBe('Click Me');
  });

  it('should call onClick function when button is clicked', () => {
    const TestComponent = () => (
      <Button
        text="Click Me"
        onClick={mockOnClick}
      />
    );

    render(<TestComponent />);
    const buttonElement = screen.getByRole('button');

    // Simulate the click event on the button element
    fireEvent.click(buttonElement);

    // Expect the onClick handler to have been called once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
