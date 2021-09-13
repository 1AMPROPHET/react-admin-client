import React, { Component } from 'react'
import { formatDate } from '../../utils/dateFormat'
import LinkButton from '../../components/linkButton/LinkButton'
import { PAGE_SIZE } from '../../assets/text/pageInstance'
import { reqDeleteUser, reqGetUser, reqAddOrUpdateUser } from '../../api/user'
import UserForm from './UserForm'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'

export default class User extends Component {

  constructor (props) {
    super(props)

    this.state = {
      users: [],
      roles: [],
      isShow: false
    }
  }

  UNSAFE_componentWillMount () {
    this.initCol()
  }

  componentDidMount () {
    this.getUsers()
  }

  initCol = () => {
    this.col = [
      {
        title: 'User Name',
        dataIndex: 'username'
      },
      {
        title: 'E-mail',
        dataIndex: 'email'
      },
      {
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        title: 'Register Time',
        dataIndex: 'create_time',
        render: (time) => formatDate(new Date(time), "yyyy-MM-dd hh:mm:ss")
      },
      {
        title: 'Role',
        dataIndex: 'role_id',
        render: (role_id) => this.state.roles.find(role => role._id === role_id).name
        // render: (role_id) => this.roleNames(role_id)
      },
      {
        title: 'Methods',
        render: (user) => (
          <span>
            <LinkButton onClick={this.showUpdate(user)}>Modify</LinkButton>
            <LinkButton onClick={this.deleteUser(user)}>Delete</LinkButton>
          </span>
        )
      }
    ]
  }
  // 删除指定用户
  deleteUser = (user) => {
    return () => {
      Modal.confirm({
        title: 'Confirm',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: async () => {
          const res = await reqDeleteUser(user._id)
          if (res.status === 0) {
            message.success(' User Deleted')
            this.getUsers()
          }
        }
      })
    }
  }
  // 添加界面
  showAdd = () => {
    this.user = {}
    this.setState({isShow: true})
  }

  // 显示修改界面
  showUpdate = (user) => {
    return () => {
      this.user = user
      this.setState({
        isShow: true,
      })
    }
  }

  // 根据role数组，生成包含所有角色名字的对象
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre.role_id = role.name
      return pre
    }, {})
    this.roleNames = roleNames
  }

  getUsers = async () => {
    const res = await reqGetUser()
    if (res.status === 0) {
      const {users, roles} = res.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  addOrUpdateUser = async () => {
    // 收集数据
    this.formRef.current.validateFields().then( async value => {
      // 添加用户, 发送请求
      const user = value
      if (this.user && this.user._id) {
        user._id = this.user._id
      }
      const res = await reqAddOrUpdateUser(user)
      if (res.status === 0) {
        message.success(`${this.user._id ? 'Update' : 'Add'} user succeed`)
        // 显示更新
        this.getUsers()
        this.setState({isShow: false})
        this.formRef.current.resetFields()
      } else {
        message.error('Failed')
      }
    })
    // const user = this.formRef.current.getFieldsValue()
    // this.formRef.current.resetFields()
    // if (this.user) {
    //   user._id = this.user._id
    // }
    // const res = await reqAddOrUpdateUser(user)
    // if (res.status === 0) {
    //   message.success(`${this.user._id ? 'Update' : 'Add'} user succeed`)
    //   this.getUsers()
    // }
  }

  onCancel = () => {
    this.setState({
      isShow: false,
    })
    this.formRef.current.resetFields()
  }

  render() {

    const {users, isShow, roles} = this.state
    const user = this.user || {}

    const title = <Button type="primary" onClick={this.showAdd}>
                    Create User
                  </Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.col}
          pagination={{defaultPageSize: PAGE_SIZE}}
        >
        </Table>
        <Modal
          title={user._id ? 'Modify User' : 'Add User'}
          visible={isShow} 
          onOk={this.addOrUpdateUser}
          onCancel={this.onCancel}
        >
          <UserForm 
            getFormRef={formRef => this.formRef = formRef}
            roles={roles}
            user={user}
          />
        </Modal>
      </Card>
    )
  }
}
