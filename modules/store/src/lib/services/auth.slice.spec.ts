import { describe, it, expect } from 'vitest';
import authReducer, { setCredentials, clearCredentials } from './auth.slice';

describe('authSlice', () => {
  const initialState = {
    token: null,
    user: null,
  };

  const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'testuser@example.com',
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const token = 'test-token';
    const state = authReducer(
      initialState,
      setCredentials({ user: mockUser, token })
    );
    expect(state).toEqual({
      token,
      user: mockUser,
    });
  });

  it('should handle clearCredentials', () => {
    const previousState = {
      token: 'test-token',
      user: mockUser,
    };
    const state = authReducer(previousState, clearCredentials());
    expect(state).toEqual(initialState);
  });
});