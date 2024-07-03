import { render } from '@testing-library/react';

import Transaction from './Transaction';

describe('Transaction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Transaction />);
    expect(baseElement).toBeTruthy();
  });
});
