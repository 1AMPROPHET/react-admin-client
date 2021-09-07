import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './home/Home'
import Detail from './detail/Detail'
import AddandUpdate from './add&update/AddandUpdate'

// 商品路由

export default class Manager extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/product/detail" component={Detail}></Route>
          <Route exact path="/product/add&update" component={AddandUpdate}></Route>
          <Route exact path="/product" component={ProductHome}></Route>
          <Redirect to="/product" />
        </Switch>
      </div>
    )
  }
}
