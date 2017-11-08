// @flow

import createReducer from './createReducer.js';

describe('createReducer()', () => {
  it('should be a function.', () => {
    expect(typeof createReducer).toBe('function');
  });

  it('should return a curry function.', () => {
    const state = {};
    const handlers = {};
    const reducer = createReducer(state, handlers);

    expect(typeof reducer).toBe('function');
  });

  it('should fallback to the initial state if no incomming state was passed.', () => {
    const state = {};
    const reducer = createReducer(state);

    // $FlowFixMe: suppressing this error since it is a test case
    expect(reducer()).toBe(state);
  });

  it('should return the incomming state if no action handler was matched.', () => {
    const state = {};
    const handlers = {
      bar: jest.fn()
    };
    const reducer = createReducer(state, handlers);

    // $FlowFixMe: suppressing this error since it is a test case
    expect(reducer(state)).toBe(state);
    expect(handlers.bar.mock.calls.length).toBe(0);
  });

  it('should call the action handler if the given action type matches a key of the provided handlers map and use the return value as the newState.', () => {
    const state = {};
    const handlers = {
      foo: jest.fn(state =>
        Object.assign({someVal: 'returnedFromTheActionHandler'}, state)
      )
    };
    const newState = createReducer(state, handlers)(state, {
      type: 'foo',
      payload: {}
    });

    expect(handlers.foo.mock.calls.length).toBe(1);
    expect(newState).toEqual({someVal: 'returnedFromTheActionHandler'});
  });

  it('should call the curry function of the action handler with the incomming state and use the return value as the newState.', () => {
    const state = {};
    const curryFn = jest.fn(state =>
      Object.assign({someVal: 'returnedFromTheCurryFn'}, state)
    );
    const handlers = {
      foo: jest.fn(() => curryFn)
    };
    const newState = createReducer(state, handlers)(state, {
      type: 'foo',
      payload: {}
    });

    expect(curryFn.mock.calls.length).toBe(1);
    expect(newState).toEqual({someVal: 'returnedFromTheCurryFn'});
  });
});
