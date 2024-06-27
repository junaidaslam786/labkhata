import { render } from '@testing-library/react';

import CreateAccountsPage from './CreateAccountsPage';

describe('CreateAccountsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateAccountsPage />);
    expect(baseElement).toBeTruthy();
  });
});
