# `createRootSaga(...sagas)`
The `createRootSaga` function can be used to merge an array of sagas into one so-called `rootSaga`, you can compare it to the same concept as having a `rootReducer` for multiple `reducers` in your application.

Internally all of the given sagas will be executed in a wrapping generator function using the `all` and `call` effects from `redux-saga`.

#### Example usage
```js
import createSagaMiddleware from 'redux-saga';
import {createRootSaga} from 'redux-lumbergh';
import mySaga1 from './saga1.js';
import mySaga2 from './saga2.js';

const sagaMiddleware = createSagaMiddleware();
const rootSaga = createRootSaga([
  mySaga1,
  mySaga2
]);

sagaMiddleware.run(rootSaga);
```
