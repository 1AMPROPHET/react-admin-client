import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {
  Button,
  Card
} from 'antd'

export default class Line extends Component {

  state = {
    sold: [120, 200, 150, 80, 70, 110, 130],
    storage: [300, 400, 350, 280, 170, 310, 290]
  }

  update = () => {
    this.setState((state) => {
      return ({
        sold: state.sold.map(item => item + 10),
        storage: state.storage.map(item => item - 10 < 0 ? 0 : item - 10)
      })
    })
  }

  getOption = (sold, storage) => {
    return {
      tooltip: {},
      legend: {
        data: ['sold', 'storage'],
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
          name: 'sold',
          data: sold,
          type: 'line',
        },
        {
          name: 'storage',
          data: storage,
          type: 'line'
        }
      ],
      
    }
  }


  render() {
    const {sold, storage} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>Update</Button>
        </Card>
        <Card title="line">
          <ReactEcharts option={this.getOption(sold, storage)}/>
        </Card>
      </div>
    )
  }
}
