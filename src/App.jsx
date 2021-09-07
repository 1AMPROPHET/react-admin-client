/*
  应用根组件
*/

import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loading from './components/loading/Loading'
const Login = lazy(() => import('./pages/login/Login'))
const Admin = lazy(() => import('./pages/admin/Admin'))

export default class App extends Component {
  render() {
    return (
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          <Redirect to="/login"/>
        </Switch>
      </Suspense>
    )
  }
}