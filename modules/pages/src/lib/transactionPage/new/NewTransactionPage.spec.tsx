import { render } from '@testing-library/react';

import NewTransactionPage from './NewTransactionPage';

describe('NewTransactionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewTransactionPage />);
    expect(baseElement).toBeTruthy();
  });
});
