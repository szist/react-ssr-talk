/* global window, document */
import '@babel/polyfill'

import * as React from 'react'
import { hydrate } from 'react-dom'
import asyncBootstrapper from 'react-async-bootstrapper'

import Root from './root_v4'
import configureStore from './configureStore'

const initialState = window.INITIAL_STATE
const asyncState = window.ASYNC_STATE
const jobState = window.JOB_STATE
const store = configureStore(initialState)

const app = <Root store={store} async={asyncState} jobs={jobState} />
const element = document.getElementById('app')
if (!element) {
  throw new Error("couldn't find element with id app")
}

asyncBootstrapper(app).then(() => hydrate(app, element))

/* eslint-env node */
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./root', () => {
    import('./root').then(({ default: NewRoot }) => {
      hydrate(<NewRoot store={store} async={asyncState} jobs={jobState} />, element)
    })
  })
}
