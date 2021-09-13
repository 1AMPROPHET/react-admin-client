import React, { Component } from 'react'
import logo from "../../assets/images/logo/logo192.png"
import { menuList } from '../../assets/text/left-nav-statics'
import { Link, withRouter } from 'react-router-dom';
// import memoryUtils from '../../utils/memoryUtils'
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/actions/headTitle';

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

  // 判断当前用户登录对item是否有权限
  hasAuth = (item) => {
    const {link, isPublic} = item

    // const menus = memoryUtils.user.role.menus
    // const username = memoryUtils.user.username
    // 使用redux
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    
    // 1. 如果当前用户是admin，拥有所有权限，返回true
    // 2. 如果当前item是公开的，直接返回true
    // 3. 当前用户有此item权限，判断key是否在menus内
    if (username === 'admin' || isPublic || menus.indexOf(link) !== -1) {
      return true
    } else if (item.subMenu) { // 4. 如果能匹配到子item，需要显示父item
      return !!item.subMenu.find(child => menus.indexOf(child.link) !== -1) 
    }
    return false
  }

  getMenuNode = (menu) => {
    // map()循环生成菜单
    const path = this.props.location.pathname

    // 如果用户有item的权限，才返回要显示的菜单
    return (
      menu.map(menuItem => {
        // 如果当前用户有权限，才需要显示对应的菜单项
        if (this.hasAuth(menuItem)) {
          if (menuItem.subMenu === undefined) {
            // redux 判断item是否是当前的item
            if (menuItem.link === path || path.indexOf(menuItem.link) === 0) {
              // 更新redux的headTitle状态
              this.props.setHeadTitle(menuItem.text)
            }
            return (
              <Menu.Item 
                key={menuItem.link} 
                // 动态生成Icon
                icon={this.renderIcon(menuItem.icon, this.state.icons)}
              >
                <Link to={menuItem.link} onClick={() => this.props.setHeadTitle(menuItem.text)}>
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
        } else {
          return null
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

export default connect(
  state => ({
    user: state.userReducer
  }),
  {
    setHeadTitle
  }
)(withRouter(LeftNav))
