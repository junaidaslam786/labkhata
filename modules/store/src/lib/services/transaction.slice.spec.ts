import {
  fetchTransaction,
  transactionAdapter,
  transactionReducer,
} from './transaction.slice';

describe('transaction reducer', () => {
  it('should handle initial state', () => {
    const expected = transactionAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(transactionReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchTransaction', () => {
    let state = transactionReducer(undefined, fetchTransaction.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = transactionReducer(
      state,
      fetchTransaction.fulfilled([{ id: 1 }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = transactionReducer(
      state,
      fetchTransaction.rejected(new Error('Uh oh'), '')
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
