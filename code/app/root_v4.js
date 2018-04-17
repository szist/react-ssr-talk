// @flow
import * as React from 'react'
import App from './containers/App/App_v4'
import CatchError from './containers/CatchError'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AsyncComponentProvider } from 'react-async-component'
import { JobProvider } from 'react-jobs'

const Root = ({ store, async, jobs }) => (
  <CatchError>
    <AsyncComponentProvider rehydrateState={async}>
      <JobProvider rehydrateState={jobs}>
        <Provider store={store} key="provider">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </JobProvider>
    </AsyncComponentProvider>
  </CatchError>
)

export default Root
