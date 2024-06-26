import { render } from '@testing-library/react';

import CreateCompanyComponent from './CreateCompanyComponent';

describe('CreateCompanyComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCompanyComponent />);
    expect(baseElement).toBeTruthy();
  });
});
