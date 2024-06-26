import { fetchCompany, companyAdapter, companyReducer } from './company.slice';

describe('company reducer', () => {
  it('should handle initial state', () => {
    const expected = companyAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(companyReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCompany', () => {
    let state = companyReducer(undefined, fetchCompany.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = companyReducer(state, fetchCompany.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = companyReducer(
      state,
      fetchCompany.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
