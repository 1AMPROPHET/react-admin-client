import React, { Component } from 'react'
import logo from '../../assets/images/logo/logo512.png'
import './loading.less'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={logo} alt="logo"/>
      </div>
    )
  }
}
