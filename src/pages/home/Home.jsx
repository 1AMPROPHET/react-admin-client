import React, { Component } from 'react'
import {
  Card,
  DatePicker
} from 'antd'
// import { StickyContainer, Sticky } from 'react-sticky';

import './home.less'
import Line from './Line'
import Bar from './Bar'
import Statics from './Statics'
import Task from './Task'

const {RangePicker} = DatePicker

// 主页

export default class Home extends Component {

  state = {
    tabKey: 'sold'
  }

  tabClick = (title) => {
    return () => this.setState({
      tabKey: title
    })
  }

  render() {

    const {tabKey} = this.state
    const extra = (
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
      />
    )

    return (
      <div className="home">
        <div className="statics-line">
          <Statics/>
          <Line/>
        </div>
        <Card
          className="content-card"
          style={{margin: '20px 0 10px 0'}}
          bordered={false}
          headStyle={{alignItems: 'normal'}}
          title={
            <div className="content-title">
              <span 
                className={tabKey === 'sold' ? 'active-tab' : null}
                onClick={this.tabClick('sold')}
              >
                Sold
              </span>
              <span 
                className={tabKey === 'storage' ? 'active-tab' : null}
                onClick={this.tabClick('storage')}
              >
                Storage
              </span>
            </div>
          }
          extra={extra}
        >
          <div style={{display: 'flex'}}>
            <Bar name={tabKey}/>
            <Task/>
          </div>
        </Card>
      </div>
    )
  }
}
