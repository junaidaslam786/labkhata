import { render } from '@testing-library/react';

import CompanyDashboard from './CompanyDashboard';

describe('CompanyDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
