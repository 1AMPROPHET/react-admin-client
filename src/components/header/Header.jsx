import React, { Component } from 'react'
import LinkButton from '../linkButton/LinkButton'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import { getWeather } from '../../api/weather'
import { formatDate } from '../../utils/dateFormat'
import { menuList } from '../../assets/text/left-nav-statics'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './myHeader.less'

// 头部组件

class Header extends Component {

  state = {
    date: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
    weather: "",
    temperature: ""
  }

  // 定时器
  timer = null

  componentDidMount () {
    // 开启定时器
    // 获得天气
   this.getWeather(610100)
   this.getTime()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  getTime = () => {
    // 得到标准时间
    this.timer = setInterval(() => {
      this.setState({
        date: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
      })
    }, 1000);
  }

  getWeather = (cityId) => {
    // 取得天气信息
    getWeather(cityId).then(res => {
      this.setState({
        weather: res.weather,
        temperature: res.temperature
      })
    })
  }

  getTitle = () => {
    // 得到当前请请求路径
    const path = this.props.location.pathname
    let title = ''
    menuList.forEach(item => {
      if (path.indexOf(item.link) === 0) {
        title = item.text
      } else if (item.subMenu) {
        const subItem = item.subMenu.find(sub => path.indexOf(sub.link) === 0)
        if (subItem) {
          title = subItem.text
        }
      }
    })
    return title
  }

  logout = () => {
    Modal.confirm({
      title: 'Are you sure to logout?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        // 先删除保存的用户信息
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 点击否后跳转到login界面
        this.props.history.replace('/login')
      },
      onCancel: () => {
        
      }
    })
  }

  render() {

    const {date, temperature, weather} = this.state

    const username = memoryUtils.user.username

    const title = this.getTitle()

    return (
      <div className="myHeader">
        <div className="header-top">
          <span>Welcome, {username}{'\u00A0\u00A0'}</span>
          <LinkButton onClick={this.logout}>Log out</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{date}  </span>
            <span>{temperature}℃  {weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
