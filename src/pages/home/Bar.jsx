import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import {
  Card
} from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export default class Bar extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  state = {
    sold: [120, 200, 150, 80, 70, 110, 130],
    storage: [300, 400, 350, 280, 170, 310, 290]
  }

  getOption = (data) => {
    return {
      tooltip: {},
      legend: {
        data: [this.props.name],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.props.name,
          data: data,
          type: 'bar'
        },
      ]
    }
  }


  render() {
    const {sold, storage} = this.state
    const {name} = this.props
    return (
      <div style={{flex: 1}}>
        <Card 
          title="sold" 
          style={{display: name === 'sold' ? 'block' : 'none'}}
          extra={<ReloadOutlined/>}
        >
          <ReactEcharts style={{animationDuration: 1000}} option={this.getOption(sold)}/>
        </Card>
        <Card 
          title="storage" 
          style={{display: name === 'storage' ? 'block' : 'none'}}
          extra={<ReloadOutlined/>}
        >
          <ReactEcharts style={{animationDuration: 1000}} option={this.getOption(storage)}/>
        </Card>
      </div>
    )
  }
}
