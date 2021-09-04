import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

import {Layout} from 'antd'
import LeftNav from "../../components/left_nav/LeftNav"
import MyHeader from '../../components/header/Header'
import { secondRouter } from '../../assets/text/second-router-statics'

import './admin.less'

const {Footer, Sider, Content, Header} = Layout

/* 
  后台路由组件
*/
export default class Admin extends Component {

  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to="/login"/>
    }
    return (
      <>
        <Layout className="layout">
          <Sider className="sider">
            <LeftNav/>
          </Sider>
          <Layout className="layout2">
            <Header className="header">
              <MyHeader/>
            </Header>
            <Content className="content">
              <Switch>
                {
                  secondRouter.map(item => {
                    return <Route path={item.path} component={item.component} key={item.key}/>
                  })
                }
                <Redirect to="/home"/>
              </Switch>
            </Content>
            <Footer className="footer">Ant Design ©2021 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )
  }
}
