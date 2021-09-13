import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
  Button,
  Row,
  Col
} from 'antd'
import { setHeadTitle } from '../../redux/actions/headTitle'

class NotFound extends Component {

  goHome = () => {
    this.props.history.replace('/home')
    this.props.setHeadTitle('Home')
  }

  render() {
    return (
      <Row className='not-found'>
        <Col span={12} className='left'></Col>
        <Col span={12} className='right'>
          <h1>404</h1>
          <h2>Page not found</h2>
          <div>
            <Button type="primary" onClick={this.goHome}>Home</Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(
  null,
  {
    setHeadTitle
  }
)(NotFound)
