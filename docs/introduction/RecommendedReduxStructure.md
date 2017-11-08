# Recommended Redux Structure

We recommend to structure your redux application in so called `modules` or [`ducks`](https://github.com/erikras/ducks-modular-redux), we found that the purity of the ducks concept(having actionTypes, actions, reducers, ... in one single file) fits perfectly smaller modules, but once your duck reaches more than 100 lines it becomes a bit messy.

This is why we split up our redux application into so called `modules` inside your `store` folder. Each `module` of the following files or folders.

```
store/
├── modules/
|   └── myModule/
|   |   ├── sagas/
|   |   |   ├── mySaga.js // Defines a saga of your module.
|   |   |   └── index.js  // Imports and exposes all sagas of your module.
|   |   ├── actions.js            // Contains all actionTypes and actions(or sometimes known as actionCreators).
|   |   ├── index.js              // Exposes everything and holds your `reducer` and `initialState`.
|   |   ├── selectors.js          // So called input-selectors for reselect (Not memoized).
|   |   ├── selectors.memoized.js // Composed and memoized selectors created by reselects createSelector() function.
|   |   └── types.js              // Re-Usable type definitions (e.g. of flow/typescript)
|   └── ...
├── index.js // Initializes your store.
└── types.js // Describes the whole state structure, useful if you want to annotate your `mapStateToProps` arguments for enhanced DX.
```
