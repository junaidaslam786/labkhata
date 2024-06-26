import { render } from '@testing-library/react';

import Company from './company';

describe('Company', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Company />);
    expect(baseElement).toBeTruthy();
  });
});
