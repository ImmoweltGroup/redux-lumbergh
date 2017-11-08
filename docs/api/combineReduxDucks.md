# `combineReduxDucks({ducks: Array<>, context: 'client' | 'server' | 'universal' | 'test'})`
Combining your reducers and sagas manually is tedious and creates a lot of unnecessary `import` statements. The `combineReduxDucks()` function reduces this overhead by taking the whole redux duck exports and returning you the finalized `rootReducer` and `rootSaga` of your application.

Using this pattern the redux duck itself is also responsible for it's namespace under which the reducer will act, e.g. the key you would usually provide to the `combineReducers` function of `redux`.

Another benefit is that the `combineReduxDucks()` function automatically filters out sagas that do not match the provided context / environment.

#### Example usage
```js
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {combineReduxDucks} from 'redux-lumbergh';
import * as myDuck from './ducks/example/';

const {rootSaga, rootReducer} = combineReduxDucks({
  //
  // A duck should be an object of the following structure:
  // {
  //   moduleId: string,
  //   reducer: Function,
  //   sagas?: Array<Function>
  // }
  //
  ducks: [myDuck],

  //
  // The context in which the application will be executed within.
  // This value could also be 'server' and will be used when filtering out sagas using the `createEnvironmentSpecificSaga` util.
  //
  context: 'client'
});
const sagaMiddleware = createSagaMiddleware();
const rootMiddleware = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer, initialState, rootMiddleware);

sagaMiddleware.run(rootSaga);
```
