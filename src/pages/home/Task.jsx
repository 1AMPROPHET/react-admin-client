import React, { Component } from 'react'
import { Steps, Card } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
const { Step } = Steps

export default class Task extends Component {
  render() {
    return (
      <Card 
        title="Task" 
        extra={<ReloadOutlined/>}
        style={{marginLeft: '50px', width: '300px'}}
      >
        <Steps progressDot current={3} direction="vertical">
          <Step title="New Version" description="" />
          <Step title="Web Design" description="" />
          <Step title="Api" description="Functional Test" />
          <Step title="Login" description="Login" />
          <Step title="Publish" description="Final version" />
        </Steps>
      </Card>
    )
  }
}
