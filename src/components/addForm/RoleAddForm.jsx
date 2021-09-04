import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Form, 
  Input 
} from 'antd'

const { Item } = Form

// category中添加的form

export default class RoleAddForm extends Component {

  formRef = React.createRef()

  static propTypes = {
    getFormRef: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount () {
    this.props.getFormRef(this.formRef)
  }

  render() {

    const formLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16}
    }

    return (
      <Form ref={this.formRef} initialValues={{role: ""}}>
        <Item 
          label="Role Name: "
          name="role"
          hasFeedback
          rules={[
            {type: 'string'},
            {required: true, message: "Role's Name can not be empty"}
          ]}
          {...formLayout}
        >
          <Input 
            
            placeholder="Please input role name."
          />
        </Item>
      </Form>
    )
  }
}
