import { render } from '@testing-library/react';

import Company from './Company';

describe('Company', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Company />);
    expect(baseElement).toBeTruthy();
  });
});
