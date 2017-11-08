// @flow

type StateType = Object;
type ActionPayloadType = Object;
type ActionType = {
  type: string,
  payload: ActionPayloadType
};
type HandlerReturnType = StateType | (StateType => StateType);
type HandlerType = (ActionPayloadType, StateType) => HandlerReturnType;
type HandlersType = {
  [string]: HandlerType
};
type ReducerType = (StateType, ActionType) => StateType;

/**
 * A factory which creates a new redux reducer.
 *
 * @param  {Object} initialState The initial state of the reducer.
 * @param  {Object} handlers     An object containing actionNames as keys and reducer functions which will mutate the
 *                               incomming state based on the payload.
 * @return {*}                   The mutated state.
 */
function createReducer(
  initialState: StateType,
  handlers: HandlersType = {}
): ReducerType {
  return (state = initialState, action = {}) => {
    const handler: HandlerType = handlers[action.type];

    if (typeof handler === 'function') {
      const val: HandlerReturnType = handler(action.payload, state);

      //
      // In most cases using curry-functions like the library plow-js results in way cleaner code.
      //
      if (typeof val === 'function') {
        return val(state);
      }

      return val;
    }

    return state;
  };
}

export {createReducer as default, createReducer};
