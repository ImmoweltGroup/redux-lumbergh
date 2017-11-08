# `createEnvironmentSpecificSaga`
Out of the box `redux-saga` does not provide a way to distinguish sagas that should be run on the server, client or even in both environments (universal). This is a requirement once you need to execute business logic on the server and wait for it to finish before starting the rendering process.

E.g. lets imagine that you want to render a ToDo app on the server and you want to render only once you loaded all todos from your API.

Usually you would only want to fetch the data on the server and pass it to the client as the initial state to avoid creating the same request twice on both the server and the client. On the client however you want to listen for a certain actionType to reload the data, e.g. with the `takeLatest` effect, but a saga/generator function which yields such an effect would never fulfill which results in a never ending request on the server.

This is why we created wrapper functions that you can use to declaratively set a saga to be run only in a certain environment.

The exports contain three functions, for a full explanation see the API examples below.

```js
import {createEnvironmentSpecificSaga} from 'redux-lumbergh';

function* mySaga {}

//
// Export a list of sagas which declaratively specify which saga we would want to run in a specific environment.
//
export default [
  // Lets mark the saga to be run only on the client.
  createEnvironmentSpecificSaga.client(mySaga),

  // ... or on the server..
  createEnvironmentSpecificSaga.server(mySaga),

  // ... or even `universal` which instructs the server to be executed on both the server and the client.
  createEnvironmentSpecificSaga.universal(mySaga)
];
```

### `createEnvironmentSpecificSaga.client(Saga: Generator)`
Marks the saga as a `client-only` saga.

### `createEnvironmentSpecificSaga.server(Saga: Generator)`
Marks the saga as a `server-only` saga.

### `createEnvironmentSpecificSaga.universal(Saga: Generator)`
Marks the saga as a `universal` saga which will be run on both the server and the client.

### `isSagaSpecificToEnvironment(Saga: Generator, EnvironmentId: 'client' | 'server')`
Checks if the given saga is specified to be executed in the given EnvironmentId.

**Pro-Tip:** just use our `combineReduxDucks` function which will handle this case automatically.
