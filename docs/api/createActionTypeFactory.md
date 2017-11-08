# `createActionTypeFactory(appNamespace: string, moduleNamespace: string)`
When writing a redux application with multiple reducers, one of the first good-habits to take care of is that your actionTypes should be unique. We solve this by using the `createActionTypeFactory` function which adds namespaces to your actionTypes without much duplication.

> TL;DR Use this function to reduce the pain of maintaining your application as it grows.

#### Example usage
```js
import {createAction} from 'redux-actions';
import {createActionTypeFactory} from 'redux-lumbergh';

const createActionType = createActionTypeFactory('myTodoMvcApp', 'todos');
const actionTypes = {
  ADD_TODO: createActionType('ADD_TODO'),
  REMOVE_TODO: createActionType('REMOVE_TODO')
};

console.log(actionTypes.ADD_TODO); // "@myTodoMvcApp/todos/ADD_TODO"

//
// ... or with even less characters using the `fromArray` method.
// The `fromArray` method returns the same shaped map/object as seen above.
//
const actionTypes2 = createActionType.fromArray(['ADD_TODO', 'REMOVE_TODO']);

console.log(actionTypes2.ADD_TODO); // "@myTodoMvcApp/todos/ADD_TODO"

```
