import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import configureStore from 'configureStore'
import CatchError from 'containers/CatchError'
import App from 'containers/App/App'
import Html from './Html'
import timeIt from './timings'

// $FlowIgnore this gets dynamically created by the build process
const assets = require('./assets')

export default async (req, res) => {
  timeIt('start')
  const store = configureStore()

  try {
    const routerContext = {}
    const app = (
      <CatchError>
        <Provider store={store} key="provider">
          <StaticRouter context={routerContext} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      </CatchError>
    )
    const body = renderToString(app)
    timeIt('rendered')

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
      <Html assets={initialAssets} initialState={store.getState()} body={body} />
    )

    timeIt('html')
    return res.send(`<!doctype html>\n${html}`)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    return res.status(500).send(error.message)
  }
}
