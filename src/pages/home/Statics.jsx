import React, { Component } from 'react'
import {
  Card,
  Statistic
} from 'antd'
import {
  QuestionCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined
} from '@ant-design/icons'

export default class Statics extends Component {
  render() {
    return (
      <Card
        title="Total"
        extra={<QuestionCircleOutlined style={{color: '#999'}}/>}
        style={{width: '250px'}}
        headStyle={{color: '#ccc'}}
        bordered={false}
      >
        <Statistic
          value={1128163}
          // suffix="个"
          style={{
            fontWeight: 'bolder', 
            textAlign: 'center',
            marginTop: '100px'
          }}
        />
        <Statistic
          value={15}
          valueStyle={{fontSize: '15px', textAlign: 'center'}}
          prefix={'周同比'}
          suffix={
            <div>
              %<ArrowUpOutlined 
                style={{color: 'red', marginLeft: '10px'}}
              />
            </div>
          }
        />
        <Statistic
          value={10}
          valueStyle={{fontSize: '15px', textAlign: 'center'}}
          prefix={'日同比'}
          suffix={
            <div>
              %<ArrowDownOutlined style={{color: '#3f8600', marginLeft: '10px'}}/>
            </div>
          }
        />
      </Card>
    )
  }
}
