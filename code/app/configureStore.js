/* global window, module, process */
import { canUseDOM } from 'exenv'
import { createStore, applyMiddleware, compose } from 'redux'

import createReducer from './reducers'

const env = process.env.NODE_ENV
const ext = env === 'production' || env === 'staging' ? 'prod' : 'dev'

export default function configureStore(initialState = {}) {
  const middlewares = [
    /* thunk */
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    canUseDOM && ext === 'dev' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false
        })
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  /* eslint-env node */
  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer())
    })
  }

  return store
}
