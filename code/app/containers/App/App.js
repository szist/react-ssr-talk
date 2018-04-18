import * as React from 'react'
import { Route, Switch, Link, NavLink } from 'react-router-dom'

import Simple from 'containers/Simple/Simple'
import AsyncData from 'containers/AsyncData/AsyncData'
import CodeSplit from 'containers/CodeSplit/CodeSplit'
import MediaExample from 'containers/MediaExample/MediaExample'

import s from './App.pcss'

const App = () => (
  <div>
    <ul className={s.nav}>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <NavLink to="/simple" activeClassName={s.active}>
          simple
        </NavLink>
      </li>
      <li>
        <NavLink to="/asyncData" activeClassName={s.active}>
          async data
        </NavLink>
      </li>
      <li>
        <NavLink to="/codeSplit" activeClassName={s.active}>
          code split
        </NavLink>
      </li>
      <li>
        <NavLink to="/mediaQuery" activeClassName={s.active}>
          media query
        </NavLink>
      </li>
    </ul>
    <div>
      <Switch>
        <Route exact path="/" component={() => <div>Default content</div>} />
        <Route exact path="/simple" component={Simple} />
        <Route exact path="/asyncData" component={AsyncData} />
        <Route exact path="/codeSplit" component={CodeSplit} />
        <Route exact path="/mediaQuery" component={MediaExample} />
      </Switch>
    </div>
  </div>
)

export default App
