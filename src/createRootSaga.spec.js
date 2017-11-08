// @flow

import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import createRootSaga from './createRootSaga.js';

describe('createRootSaga()', () => {
  it('should be a function.', () => {
    expect(typeof createRootSaga).toBe('function');
  });

  it('should return a valid rootSaga for redux-saga.', () => {
    const rootSaga = createRootSaga();

    expect(typeof rootSaga).toBe('function');
    expect(typeof rootSaga().next).toBe('function');
  });

  it('should execute all sagas in the propagated list.', async () => {
    const sagas = [
      jest.fn(() => Promise.resolve()),
      jest.fn(() => Promise.resolve())
    ];
    const sagaMiddleware = createSagaMiddleware();
    const rootSaga = createRootSaga(sagas);

    createStore(jest.fn(), {}, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(rootSaga).done;

    expect(sagas[0].mock.calls.length).toBe(1);
    expect(sagas[1].mock.calls.length).toBe(1);
  });
});
