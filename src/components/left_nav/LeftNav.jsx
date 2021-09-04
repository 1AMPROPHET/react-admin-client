import React, { Component } from 'react'
import logo from "../../assets/images/logo/logo192.png"
import { menuList } from '../../assets/text/left-nav-statics'
import { Link, withRouter } from 'react-router-dom';

import { Menu } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  AppstoreAddOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

import './left_nav.less'

const {SubMenu} = Menu

// 左侧导航组件
class LeftNav extends Component {

  state = {
    icons: {
      HomeOutlined, UserOutlined, UsergroupAddOutlined, 
      AppstoreAddOutlined, AreaChartOutlined, 
      UnorderedListOutlined, ProfileOutlined,
      LineChartOutlined, BarChartOutlined, PieChartOutlined
    }
  }

  openKey = null

  menuNode = null

  // getSnapshotBeforeUpdate() {
  //   return this.getMenuNode(menuList)
  // }

  // componentDidUpdate(preprops, prestate, preMenuNode) {
  //   this.menuNode = preMenuNode
  // }

  UNSAFE_componentWillMount() {
    this.menuNode = this.getMenuNode(menuList)
  }

  renderIcon = (iconName, iconsObject) => {
    // 生成Icon的函数
    return React.createElement(iconsObject[iconName])
  }

  getMenuNode = (menu) => {
    // map()循环生成菜单
    const path = this.props.location.pathname

    return (
      menu.map(menuItem => {
        if (menuItem.subMenu === undefined) {
          return (
            <Menu.Item 
              key={menuItem.link} 
              // 动态生成Icon
              icon={this.renderIcon(menuItem.icon, this.state.icons)}
            >
              <Link to={menuItem.link}>
                {menuItem.text}
              </Link>
            </Menu.Item>
          )
        } 
        else {
    
          const subItem = menuItem.subMenu.find(item => path.indexOf(item.link) === 0)
          // 得到当前菜单的link
          if (subItem) {
            // 得到需要打开的子菜单的link
            this.openKey = menuItem.link
            // console.log(this.openKey)
          }
          
          return (
            <SubMenu 
              key={menuItem.link}
              title={menuItem.text} 
              className="sub-menu"
              icon={this.renderIcon(menuItem.icon, this.state.icons)}
            >
              {
                // 递归生成子菜单
                this.getMenuNode(menuItem.subMenu)
              }
            </SubMenu>
          )
        }
      })
    )
  }

  render() {

    let path = this.props.location.pathname
    // 此时请求的为商品及其子路由
    if (path.indexOf('/product') === 0) {
      path = '/product'
    }

    return (
      <div className="left-nav">
        <img src={logo} alt="xxx"/>
        <header className="left-nav-header">React Client</header>
        <Menu
          defaultOpenKeys={[this.openKey]}
          selectedKeys={[path]}
          mode="inline"
          className="left-menu"
          theme="dark"
        >
          {
            this.menuNode
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
