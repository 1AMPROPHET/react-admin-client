import React, { Component } from 'react'
import {Form, Button, Input, message} from 'antd'
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from '@ant-design/icons'
import { login } from '../../api/login'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

import logo from '../../assets/images/logo/logo192.png'
import './login.less'
import { Redirect } from 'react-router'

/* 
  登陆的路由组件
*/
export default class Login extends Component {
  // 创建ref属性
  myRef = React.createRef()

  // 收集表单数据
  handleSubmit = () => {
    // 验证表单数据
    this.myRef.current.validateFields().then( (values) => {
      login(values).then(res => {
        if (res.status === 0) {
          message.success('Login succeed')
          // 保存User
          const user = res.data
          // 保存在内存中
          memoryUtils.user = user
          // 保存在local中
          storageUtils.saveUser(user)
          // 登录成功后进行路由跳转
          this.props.history.replace('/')
        } else {
          message.error('Wrong Username or Password')
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    // 如果用户已经登陆。自动跳转到admin界面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to="/"/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"></img>
          <h1>React Admin Client</h1>
        </header>
        <section className="login-section">
          <h2>User Login</h2>
          <Form 
            ref={this.myRef}
            onFinish={this.handleSubmit} 
            className="login-form" 
            initialValues={{
              remember: true,
            }}>
            <Form.Item 
              name="username" // 属性名是特定的名称: 配置对象
              // hasFeedback
              rules={[
                // 声明式验证
                {type: 'string'},
                {required: true, message: 'Username cannot be empty, Please input your Username!'},
                {min: 4, message: 'Username cannot less than 6 charactors!'},
                {max: 12, message: 'Username cannot longer than 12 charactors!'},
                {pattern: /^[a-zA-Z0-9]+$/, message: 'Username must consist of letters or numbers!'},
                {whitespace: false}
              ]}>
              <Input 
                placeholder="UserName"
                prefix={<UserOutlined style={{color: "#999"}}/>}
              />
            </Form.Item>
            <Form.Item 
              name="password"
              // hasFeedback
              rules={[
                {type: 'string'},
                {required: true, message: 'Password cannot be empty!'},
                // ({getFieldValue}) => ({
                //   validator(value) {
                //     if (value.length < 6) {
                //       return Promise.reject(new Error('Password cannot less than 6 charactors!'))
                //     }
                //   }
                // })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{color: "#999"}}/>}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item className="register">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="xxx">register now!</a>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
/* 
  * 前台表单验证
  * 手机表单输入数据
  * 
*/