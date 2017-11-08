// @flow

import createActionTypeFactory from './createActionTypeFactory.js';

describe('createActionTypeFactory()', () => {
  it('should be a function.', () => {
    expect(typeof createActionTypeFactory).toBe('function');
  });

  it('should throw an error when called without arguments.', () => {
    // $FlowFixMe: suppressing this error since it is a test case
    expect(() => createActionTypeFactory()).toThrow();
  });

  it('should throw an error when called with only one argument.', () => {
    // $FlowFixMe: suppressing this error since it is a test case
    expect(() => createActionTypeFactory('foo')).toThrow();
  });

  it('should throw an error when called with only one argument that is not a string of length.', () => {
    // $FlowFixMe: suppressing this error since it is a test case
    expect(() => createActionTypeFactory('')).toThrow();
  });

  it('should return a curry function when called with two strings of length.', () => {
    expect(() => createActionTypeFactory('foo', 'bar')).not.toThrow();
    expect(typeof createActionTypeFactory('foo', 'bar')).toBe('function');
  });
});

describe('createActionTypeFactory() -> createActionType()', () => {
  it('should throw an error when calling the curry function without arguments.', () => {
    const createActionType = createActionTypeFactory('foo', 'bar');

    // $FlowFixMe: suppressing this error since it is a test case
    expect(() => createActionType()).toThrow();
  });

  it('should throw an error when calling the curry function with an argument that is not a string of length.', () => {
    const createActionType = createActionTypeFactory('foo', 'bar');

    expect(() => createActionType('')).toThrow();
  });

  it('should return the finalized actionType from the curry function when called with an argument that is a string of length.', () => {
    const createActionType = createActionTypeFactory('foo', 'bar');
    const actionType = createActionType('baz');

    expect(actionType).toBe('@foo/bar/baz');
  });
});

describe('createActionTypeFactory() -> createActionType.fromArray()', () => {
  it('should return the an object which keys match the passed strings of the array and values which are valid actionType strings.', () => {
    const createActionType = createActionTypeFactory('foo', 'bar');
    const actionTypes = createActionType.fromArray(['baz', 'qux']);

    expect(actionTypes).toEqual({
      baz: '@foo/bar/baz',
      qux: '@foo/bar/qux'
    });
  });
});
