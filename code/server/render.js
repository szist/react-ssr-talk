import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import configureStore from 'configureStore'
import Html from './Html'
import timeIt from './timings'

// $FlowIgnore this gets dynamically created by the build process
const assets = require('./assets')

export default async (req, res) => {
  timeIt('start')
  const store = configureStore()

  try {
    const body = ''
    const initialAssets = {
      js: [assets['vendor.js'], assets['app.js']],
      css: [assets['app.css']]
    }
    const html = renderToStaticMarkup(
      <Html assets={initialAssets} initialState={store.getState()} body={body} />
    )

    timeIt('rendered')
    return res.send(`<!doctype html>\n${html}`)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    return res.status(500).send(error.message)
  }
}
