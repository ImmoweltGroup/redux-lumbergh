// @flow

import {
  isSagaSpecificToEnvironment,
  descriptorsByEnvironmentId,
  createEnvironmentSpecificSaga
} from './createEnvironmentSpecificSaga.js';

describe('createEnvironmentSpecificSaga.server()', () => {
  it('should be a function.', () => {
    expect(typeof createEnvironmentSpecificSaga.server).toBe('function');
  });

  it('should return the same instance of the input function, but attach an internal property which indicates the saga to be SSR relevant.', () => {
    const input = () => null;
    const saga = createEnvironmentSpecificSaga.server(input);

    expect(saga).toBe(input);
    expect(saga[descriptorsByEnvironmentId.server]).toBe(true);
  });
});

describe('createEnvironmentSpecificSaga.client()', () => {
  it('should be a function.', () => {
    expect(typeof createEnvironmentSpecificSaga.client).toBe('function');
  });

  it('should return the same instance of the input function, but attach an internal property which indicates the saga to be SSR relevant.', () => {
    const input = () => null;
    const saga = createEnvironmentSpecificSaga.client(input);

    expect(saga).toBe(input);
    expect(saga[descriptorsByEnvironmentId.client]).toBe(true);
  });
});

describe('createEnvironmentSpecificSaga.universal()', () => {
  it('should be a function.', () => {
    expect(typeof createEnvironmentSpecificSaga.universal).toBe('function');
  });

  it('should return the same instance of the input function, but attach an internal property which indicates the saga to be SSR relevant.', () => {
    const input = () => null;
    const saga = createEnvironmentSpecificSaga.universal(input);

    expect(saga).toBe(input);
    expect(saga[descriptorsByEnvironmentId.universal]).toBe(true);
    expect(saga[descriptorsByEnvironmentId.server]).toBe(true);
    expect(saga[descriptorsByEnvironmentId.client]).toBe(true);
  });
});

describe('isSagaSpecificToEnvironment()', () => {
  it('should be a function.', () => {
    expect(typeof isSagaSpecificToEnvironment).toBe('function');
  });

  it('should return a boolean indicating if the given argument is relevant to the second argument which represents the environmentId.', () => {
    const input = () => null;

    expect(isSagaSpecificToEnvironment(input, 'server')).toBe(false);
    expect(
      isSagaSpecificToEnvironment(
        createEnvironmentSpecificSaga.server(input),
        'server'
      )
    ).toBe(true);
  });
});
