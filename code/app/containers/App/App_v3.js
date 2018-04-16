import * as React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'

import Simple from 'containers/Simple/Simple'
import AsyncData from 'containers/AsyncData/AsyncData_v3'
import CodeSplit from 'containers/CodeSplit/CodeSplit'

const App = () => (
  <div>
    <h1>Welcome!</h1>
    <ul>
      <li>
        <NavLink to="/">home</NavLink>
      </li>
      <li>
        <NavLink to="/simple">simple</NavLink>
      </li>
      <li>
        <NavLink to="/asyncData">async data</NavLink>
      </li>
      <li>
        <NavLink to="/codeSplit">code split</NavLink>
      </li>
    </ul>
    <div>
      <Switch>
        <Route exact path="/" component={() => <div>Default content</div>} />
        <Route exact path="/simple" component={Simple} />
        <Route exact path="/asyncData" component={AsyncData} />
        <Route exact path="/codeSplit" component={CodeSplit} />
      </Switch>
    </div>
  </div>
)

export default App
