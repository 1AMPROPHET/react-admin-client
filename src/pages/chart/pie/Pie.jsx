import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {
  Button,
  Card
} from 'antd'

export default class Line extends Component {

  state = {
    sold: [
      {value: 120, name: 'A-sold'},
      {value: 200, name: 'B-sold'},
      {value: 150, name: 'C-sold'},
      {value: 80, name: 'D-sold'},
      {value: 70, name: 'E-sold'},
      {value: 110, name: 'F-sold'},
      {value: 130, name: 'G-sold'}
    ],
    storage: [
      {value: 300, name: 'A-storage'},
      {value: 400, name: 'B-storage'},
      {value: 350, name: 'C-storage'},
      {value: 280, name: 'D-storage'},
      {value: 170, name: 'E-storage'},
      {value: 310, name: 'F-storage'},
      {value: 290, name: 'G-storage'}
    ]
  }

  update = () => {
    this.setState((state) => {
      return ({
        sold: state.sold.map(item => item + 10),
        storage: state.storage.map(item => item - 10 < 0 ? 0 : item - 10)
      })
    })
  }

  getOption1 = (sold) => {
    return {
      title: {
        text: 'Sold',
        left: 'center',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#999'
        }
      },
      series: [
        {
          name: 'sold',
          data: sold,
          type: 'pie',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffSetX: 0,
              showdowColor: 'rgba(0, 0, 0, .5)'
            }
          }
        }
      ],
      
    }
  }

  getOption2 = (storage) => {
    return {
      title: {
        text: 'storage',
        left: 'center',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#999'
        }
      },
      series: [
        {
          name: 'storage',
          data: storage,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'left'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '20',
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffSetX: 0,
              showdowColor: 'rgba(0, 0, 0, .5)'
            }
          },
          labelLine: {
            show: false
          }
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
        <Card title="Bar-sold">
          <ReactEcharts option={this.getOption1(sold)}/>
        </Card>
        <Card title="Bar-storage">
          <ReactEcharts option={this.getOption2(storage)}/>
        </Card>
      </div>
    )
  }
}

