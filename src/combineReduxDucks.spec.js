// @flow

import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import {createEnvironmentSpecificSaga} from './createEnvironmentSpecificSaga.js';
import combineReduxDucks from './combineReduxDucks.js';

describe('combineReduxDucks()', () => {
  it('should be a function.', () => {
    expect(typeof combineReduxDucks).toBe('function');
  });

  it('should not throw an error when called without arguments.', () => {
    expect(() => combineReduxDucks()).not.toThrow();
  });

  it('should return an object containing the rootSaga and rootReducer.', () => {
    const results = combineReduxDucks();

    expect(typeof results).toBe('object');
    expect(typeof results.rootSaga).toBe('function');
    expect(typeof results.rootReducer).toBe('function');
  });

  it('should throw an error if one of the ducks is not a valid object.', () => {
    expect(() =>
      combineReduxDucks({
        // $FlowFixMe: suppressing this error since it is a test case
        ducks: [2]
      })
    ).toThrow();
  });

  it('should throw an error if one of the ducks does not hold a "moduleId" string.', () => {
    const reducer = jest.fn();

    expect(() =>
      combineReduxDucks({
        // $FlowFixMe: suppressing this error since it is a test case
        ducks: [{moduleId: 2, reducer}]
      })
    ).toThrow();
  });

  it('should throw an error if one of the ducks does not hold a "reducer" of type function.', () => {
    expect(() =>
      combineReduxDucks({
        // $FlowFixMe: suppressing this error since it is a test case
        ducks: [{moduleId: 'foo bar', reducer: 2}]
      })
    ).toThrow();
  });

  it('should iterate over the propagated duck exports and add the exported reducer to the generated rootReducer.', () => {
    const initialState = {foo: 'bar'};
    const reducer = jest.fn(() => initialState);

    combineReduxDucks({
      ducks: [{moduleId: 'foo', reducer}]
    });

    expect(reducer.mock.calls.length).toBeGreaterThan(1);
  });

  it('should filter out client side sagas if the provided context was set to anything other than "client".', async () => {
    const serverSaga = jest.fn(() => Promise.resolve());
    const clientSaga = jest.fn(() => Promise.resolve());
    const resuts = combineReduxDucks({
      context: 'server',
      ducks: [
        {
          moduleId: 'foo',
          reducer: () => ({foo: 'bar'}),
          sagas: [
            createEnvironmentSpecificSaga.server(serverSaga),
            createEnvironmentSpecificSaga.client(clientSaga)
          ]
        }
      ]
    });
    const sagaMiddleware = createSagaMiddleware();

    createStore(jest.fn(), {}, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(resuts.rootSaga).done;

    expect(serverSaga.mock.calls.length).toBe(1);
    expect(clientSaga.mock.calls.length).toBe(0);
  });

  it('should filter out server side sagas if the provided context was set to anything other than "server".', async () => {
    const serverSaga = jest.fn(() => Promise.resolve());
    const clientSaga = jest.fn(() => Promise.resolve());
    const resuts = combineReduxDucks({
      context: 'client',
      ducks: [
        {
          moduleId: 'foo',
          reducer: () => ({foo: 'bar'}),
          sagas: [
            createEnvironmentSpecificSaga.server(serverSaga),
            createEnvironmentSpecificSaga.client(clientSaga)
          ]
        }
      ]
    });
    const sagaMiddleware = createSagaMiddleware();

    createStore(jest.fn(), {}, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(resuts.rootSaga).done;

    expect(serverSaga.mock.calls.length).toBe(0);
    expect(clientSaga.mock.calls.length).toBe(1);
  });

  it('should filter out all sagas if the provided context was set to "test".', async () => {
    const serverSaga = jest.fn(() => Promise.resolve());
    const clientSaga = jest.fn(() => Promise.resolve());
    const resuts = combineReduxDucks({
      context: 'test',
      ducks: [
        {
          moduleId: 'foo',
          reducer: () => ({foo: 'bar'}),
          sagas: [
            createEnvironmentSpecificSaga.server(serverSaga),
            createEnvironmentSpecificSaga.client(clientSaga)
          ]
        }
      ]
    });
    const sagaMiddleware = createSagaMiddleware();

    createStore(jest.fn(), {}, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(resuts.rootSaga).done;

    expect(serverSaga.mock.calls.length).toBe(0);
    expect(clientSaga.mock.calls.length).toBe(0);
  });

  it('should not filter out any saga if the provided context was set to "universal".', async () => {
    const serverSaga = jest.fn(() => Promise.resolve());
    const clientSaga = jest.fn(() => Promise.resolve());
    const resuts = combineReduxDucks({
      context: 'universal',
      ducks: [
        {
          moduleId: 'foo',
          reducer: () => ({foo: 'bar'}),
          sagas: [
            createEnvironmentSpecificSaga.server(serverSaga),
            createEnvironmentSpecificSaga.client(clientSaga)
          ]
        }
      ]
    });
    const sagaMiddleware = createSagaMiddleware();

    createStore(jest.fn(), {}, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(resuts.rootSaga).done;

    expect(serverSaga.mock.calls.length).toBe(1);
    expect(clientSaga.mock.calls.length).toBe(1);
  });
});
