import { render } from '@testing-library/react';

import NewTransaction from './NewTransaction';

describe('NewTransaction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewTransaction />);
    expect(baseElement).toBeTruthy();
  });
});
