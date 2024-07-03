import { render } from '@testing-library/react';

import TransactionPage from './TransactionPage';

describe('TransactionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TransactionPage />);
    expect(baseElement).toBeTruthy();
  });
});
