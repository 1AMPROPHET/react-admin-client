import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Form, 
  Select, 
  Input 
} from 'antd'

import {
  EyeInvisibleOutlined, EyeTwoTone
} from '@ant-design/icons'

const { Item } = Form
const { Option } = Select

// category中添加的form

export default class UserForm extends Component {

  formRef = React.createRef()

  static propTypes = {
    getFormRef: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  UNSAFE_componentWillMount () {
    this.props.getFormRef(this.formRef)
  }

  render() {

    const {roles, user} = this.props

    const formLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    }

    return (
      <Form 
        ref={this.formRef} 
        initialValues={{
          username: user.username,
          password: user.password,
          phone: user.phone,
          email: user.email,
          role_id: user.role_id
        }} 
        {...formLayout}
      >
        <Item 
          name="username"
          hasFeedback
          label="Username"
          rules={[
            {type: 'string'},
            {required: true, message: 'Username can not be empty'}
          ]}
        >
          <Input
            type="text" 
            autoFocus="autofocus" 
            placeholder="Please input username."
          />
        </Item>
        {
          user._id ? null : (
            <Item 
              name="password"
              label="Password"
              rules={[
                {type: 'string'},
                {required: true, message: 'Password can not be empty'}
              ]}
            >
              <Input.Password
                placeholder="Please input password."
                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
              />
            </Item>
          )
        }
        
        <Item 
          name="phone"
          hasFeedback
          label="Phone"
          rules={[
            {type: 'string'},
            {required: true, message: 'Phone number can not be empty'}
          ]}
        >
          <Input 
            placeholder="Please input phone number."
          />
        </Item>

        <Item 
          name="email"
          hasFeedback
          label="E-mail"
          rules={[
            {type: 'string'},
            {required: true, message: 'E-mail can not be empty'}
          ]}
        >
          <Input 
            placeholder="Please input E-mail."
          />
        </Item>

        <Item 
          name="role_id" 
          label="Role"
          rules={[
            {required: true}
          ]}
        >
          <Select placeholder='Select role.'>
            {
              roles.map(role => {
                return <Option key={role._id} value={role._id}>{role.name}</Option>
              })
            }
          </Select>
        </Item>
      </Form>
    )
  }
}
