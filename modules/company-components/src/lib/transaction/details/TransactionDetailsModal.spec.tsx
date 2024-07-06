import { render } from '@testing-library/react';

import TransactionDetailsModal from './TransactionDetailsModal';

describe('TransactionDetailsModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TransactionDetailsModal />);
    expect(baseElement).toBeTruthy();
  });
});
