// @flow
import * as React from 'react'
import App from './containers/App/App'
import CatchError from './containers/CatchError'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const Root = ({ store }) => (
  <CatchError>
    <Provider store={store} key="provider">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CatchError>
)

export default Root
