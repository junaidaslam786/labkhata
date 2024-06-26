import { render } from '@testing-library/react';

import CreateCompany from './CreateCompany';

describe('CreateCompany', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCompany />);
    expect(baseElement).toBeTruthy();
  });
});
