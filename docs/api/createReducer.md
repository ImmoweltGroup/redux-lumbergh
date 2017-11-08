# `createReducer(actionHandlers: Object, initialState: any)`
The `createReducer` function can be used to reduce boilerplate code in your application.

The function signature is pretty easy, the first argument is an object containing keys which match the `actionType` you want to handle, the value is the `actionHandler` function that will be called with the actions `payload` and a second argument which is the current state.

The `actionHandler` function supports currying, we recommend the usage of a library such as [plow-js](https://grebaldi.gitbooks.io/plow-js/) to fully take advantage of this feature.

> TL;DR Writing a redux reducer has never been easier!

#### Example usage
```js
import {$set} from 'plow-js';
import {createReducer} from 'redux-lumbergh';

const initialState = {};
const actionHandlers = {
  //
  // Since plow-js supports curried functions, we can just return a setter.
  // Under the hood the returned setter function will be called with the current state as the first and only argument.
  //
	'myActionType': payload => $set(['foo'], payload.value)
};
const reducer = createReducer(actionHandlers, initialState);
```

The finalized `reducer` can now be passed to either the `createStore` or `combineReducer` function of redux.
