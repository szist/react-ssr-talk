/* global window, document */
import '@babel/polyfill'

import * as React from 'react'
import { hydrate } from 'react-dom'

import Root from './root_v3'
import configureStore from './configureStore'

const initialState = window.INITIAL_STATE
const store = configureStore(initialState)

const app = <Root store={store} />
const element = document.getElementById('app')
if (!element) {
  throw new Error("couldn't find element with id app")
}
hydrate(app, element)

/* eslint-env node */
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./root', () => {
    import('./root').then(({ default: NewRoot }) => {
      hydrate(<NewRoot store={store} />, element)
    })
  })
}
