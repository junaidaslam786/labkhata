import { render } from '@testing-library/react';

import NewContactPage from './NewContactPage';

describe('NewContactPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewContactPage />);
    expect(baseElement).toBeTruthy();
  });
});
