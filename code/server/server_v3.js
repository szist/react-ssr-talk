import '@babel/polyfill'

import express from 'express'
import log from 'fancy-log'
import path from 'path'
import render from './render_v3'
import { port } from './config'

import Loadable from 'react-loadable'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', render)

Loadable.preloadAll().then(
  app.listen(port, () => {
    log.info(`The server is running at http://localhost:${port}/`) // eslint-disable-line no-console
    if (process.send) {
      process.send({ port, started: true })
    }
  })
)
