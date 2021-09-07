import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Form, 
  Input 
} from 'antd'

// category中改变分类的form

export default class UpdateForm extends Component {

  inputRef = React.createRef()

  static propTypes = {
    currentCategory: PropTypes.string.isRequired,
    getFormRef: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount () {
    this.props.getFormRef(this.inputRef) 
  }

  render() {
    const {currentCategory} = this.props
    return (
      <Form ref={this.inputRef} initialValues={{categoryName: currentCategory}}>
        <Form.Item 
          name="categoryName"
          rules={[
            {type: 'string'},
            {required: true, message: 'CategoryName can not be empty'}
          ]}
        >
          <Input
            autoFocus="autofocus"
          />
        </Form.Item>
      </Form>
    )
  }
}
