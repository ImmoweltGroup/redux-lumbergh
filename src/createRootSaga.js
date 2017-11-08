// @flow

import {all, call} from 'redux-saga/effects';

/**
 * The root saga combines and executes all sagas of the importes modules in the specified order.
 *
 * @return {Generator} The finalized saga to be run by redux-saga.
 */
function createRootSaga(sagas: Array<any> = []): any {
  return function*() {
    yield all(sagas.map(saga => call(saga)));
  };
}

export {createRootSaga as default, createRootSaga};
