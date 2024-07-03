import { render } from '@testing-library/react';

import NewContact from './NewContact';

describe('NewContact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewContact />);
    expect(baseElement).toBeTruthy();
  });
});
