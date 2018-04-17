import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import asyncBootrapper from 'react-async-bootstrapper'
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import { JobProvider, createJobContext } from 'react-jobs'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import configureStore from 'configureStore'
import CatchError from 'containers/CatchError'
import App from 'containers/App/App_v4'
import Html from './Html_v4'
import timeIt from './timings'

// $FlowIgnore this gets dynamically created by the build process
const assets = require('./assets')

export default async (req, res) => {
  const store = configureStore()

  try {
    timeIt('start')
    const routerContext = {}
    const jobContext = createJobContext()
    const asyncContext = createAsyncContext()
    const app = (
      <CatchError>
        <AsyncComponentProvider asyncContext={asyncContext}>
          <JobProvider jobContext={jobContext}>
            <Provider store={store} key="provider">
              <StaticRouter context={routerContext} location={req.url}>
                <App />
              </StaticRouter>
            </Provider>
          </JobProvider>
        </AsyncComponentProvider>
      </CatchError>
    )

    // 1st pass bootstrap data
    await asyncBootrapper(app)
    timeIt('bootstrapped')

    // 2nd render to render with all data needed
    const body = renderToString(app)
    timeIt('render')

    if (routerContext.status === 404) {
      res.status(404) // Not found page should be rendered by the router
    } else if (routerContext.status === 301 || routerContext.status === 302) {
      return res.redirect(routerContext.status, routerContext.url)
    } else if (routerContext.url) {
      return res.redirect(302, routerContext.url)
    } else {
      res.status(200)
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8')

    const initialAssets = {
      js: [assets['vendor.js'], assets['app.js']],
      css: [assets['app.css']]
    }
    const html = renderToStaticMarkup(
      <Html
        assets={initialAssets}
        initialState={store.getState()}
        asyncState={asyncContext.getState()}
        jobsState={jobContext.getState()}
        body={body}
      />
    )
    timeIt('html')

    return res.send(`<!doctype html>\n${html}`)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    return res.status(500).send(error.message)
  }
}
