import { render } from '@testing-library/react';

import ContactsPage from './ContactsPage';

describe('ContactsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactsPage />);
    expect(baseElement).toBeTruthy();
  });
});
