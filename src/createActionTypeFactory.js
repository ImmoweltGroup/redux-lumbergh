// @flow

/**
 * Checks if the given value is defined, a string and of length and if one of the conditions is falsy, throws an feedback error for the developer.
 *
 * @param  {String} variableName The name of the variable.
 * @param  {*}      val          The value of the variable.
 * @return {Void}
 */
function expectRequiredString(
  variableName: string,
  position: string,
  val: string | any
): void {
  if (typeof val !== 'string' || val.length === 0) {
    throw new Error(
      `createActionTypeFactory(): The ${position} argument "${
        variableName
      }" is required to be a string and of length that represents the namespace of your application but is "${
        val
      }".`
    );
  }
}

/**
 * A factory which creates a curry function to easily create actionTypes without much repitition.
 *
 * @param  {String} appId        The namespace of your application.
 * @param  {String} moduleId     The namespace of your redux module.
 * @return {Function}            The factory into which you just pass in your actionTypeName and which returns the finalized actionType string.
 */
function createActionTypeFactory(appId: string, moduleId: string) {
  expectRequiredString('appId', 'first', appId);
  expectRequiredString('moduleId', 'second', moduleId);

  function createActionType(actionTypeName: string): string {
    expectRequiredString('actionTypeName', 'first', actionTypeName);

    return `@${appId}/${moduleId}/${actionTypeName}`;
  }
  function createActionTypesFromArray(arr: Array<string> = []) {
    return arr.reduce((actionTypesByKey, actionTypeName) => {
      actionTypesByKey[actionTypeName] = createActionType(actionTypeName);

      return actionTypesByKey;
    }, {});
  }
  createActionType.fromArray = createActionTypesFromArray;

  return createActionType;
}

export {createActionTypeFactory as default, createActionTypeFactory};
