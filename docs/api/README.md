# API Reference

Since this package only consists of a few helper functions to reduce the boilerplate of writing a redux application, the API surface is pretty small / atomic.

### Top-Level Exports

* [combineReduxDucks({ducks: Array<>, context: 'client' | 'server'})](combineReduxDucks.md)
* [createActionTypeFactory(appNamespace: string, moduleNamespace: string)](createActionTypeFactory.md)
* [createEnvironmentSpecificSaga](createEnvironmentSpecificSaga.md)
* [createReducer(actionHandlers: Object, initialState: any)](createReducer.md)
* [createRootSaga(...sagas)](createRootSaga.md)

### Importing

Every function described above is a top-level export. You can import any of them like this:

#### ES6

```js
import {combineReduxDucks} from 'redux-lumbergh';
```

#### ES5 (CommonJS)

```js
const combineReduxDucks = require('redux-lumbergh').combineReduxDucks
```
