// @flow

type OptsType = {
  context?: 'client' | 'server' | 'universal' | 'test',
  ducks: Array<{
    moduleId: string,
    reducer: Function,
    sagas?: Array<Function>,
    [string]: any
  }>
};

import {combineReducers} from 'redux';
import {isSagaSpecificToEnvironment} from './createEnvironmentSpecificSaga.js';
import createRootSaga from './createRootSaga.js';

/**
 * A factory which creates a curry function to easily create actionTypes without much repitition.
 *
 * @param  {Array} modules       The list of redux ducks exports to combine.
 * @return {Object}              The context which contains the finalized rootReducer and rootSaga.
 */
function combineReduxDucks(
  opts: OptsType = {ducks: [], context: 'client'}
): {rootSaga: Function, rootReducer: Function} {
  const {ducks, context} = opts;
  const isUniversalContext = context === 'universal';
  const isServerSideContext = context === 'server';
  const isClientSideContext = context === 'client';
  const {reducersByModuleId, sagas} = ducks.reduce(
    (accumulate, module, index) => {
      if (typeof module !== 'object') {
        throw new Error(
          `combineReduxDucks(): Unexpected type of duck at index "${
            index
          }". Export must be an object containing at least a "reducer" function and a "moduleId" string.`
        );
      }
      if (typeof module.moduleId !== 'string') {
        throw new Error(
          `combineReduxDucks(): Exported "moduleId" property of duck at index "${
            index
          }" must be a string.`
        );
      }
      if (typeof module.reducer !== 'function') {
        throw new Error(
          `combineReduxDucks(): Exported "reducer" property of duck at index "${
            index
          }" must be a reducer function.`
        );
      }

      const {sagas, reducer, moduleId} = module;

      accumulate.reducersByModuleId[moduleId] = reducer;

      if (sagas instanceof Array) {
        accumulate.sagas = accumulate.sagas.concat(sagas);
      }

      return accumulate;
    },
    {reducersByModuleId: {}, sagas: []}
  );
  const rootReducer = combineReducers(reducersByModuleId);
  const contextSagas = isUniversalContext
    ? sagas
    : sagas.filter(saga => {
        if (isServerSideContext) {
          return isSagaSpecificToEnvironment(saga, 'server');
        }

        if (isClientSideContext) {
          return isSagaSpecificToEnvironment(saga, 'client');
        }

        return false;
      });
  const rootSaga = createRootSaga(contextSagas);

  return {rootReducer, rootSaga};
}

export {combineReduxDucks as default, combineReduxDucks};
