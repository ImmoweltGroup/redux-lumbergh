// @flow

const descriptorsByEnvironmentId = {
  server: 'redux-lumbergh__environment-saga-server',
  client: 'redux-lumbergh__environment-saga-client',
  universal: 'redux-lumbergh__environment-saga-universal'
};
type SagaType = Function;
type validEnvironmentIds = $Keys<typeof descriptorsByEnvironmentId>;

/**
 * Attaches an internal property to the saga function which will be used in the `combineReduxDucks` function to filter out SSR relevant sags.
 *
 * @return {Generator} The finalized saga to be run by redux-saga.
 */
function createEnvironmentSpecificSagaWrap(environmentId: validEnvironmentIds) {
  const descriptor = descriptorsByEnvironmentId[environmentId];

  return (saga: Function) => {
    saga[descriptor] = true;

    if (environmentId === 'universal') {
      saga[descriptorsByEnvironmentId.server] = true;
      saga[descriptorsByEnvironmentId.client] = true;
    }

    return saga;
  };
}

/**
 * Checks if the given saga is specific for the second argument which represents the environmentId.
 *
 * @return {Boolean} The boolean which indicates if the saga is specific to this environment.
 */
function isSagaSpecificToEnvironment(
  saga: SagaType,
  environmentId: validEnvironmentIds
): boolean {
  const descriptor = descriptorsByEnvironmentId[environmentId];

  return typeof saga === 'function' && saga[descriptor] === true;
}

export const createEnvironmentSpecificSaga = {
  server: createEnvironmentSpecificSagaWrap('server'),
  client: createEnvironmentSpecificSagaWrap('client'),
  universal: createEnvironmentSpecificSagaWrap('universal')
};
export {isSagaSpecificToEnvironment, descriptorsByEnvironmentId};
