import React, { Component } from 'react'
import RoleAddForm from '../../components/addForm/RoleAddForm'
import AuthForm from '../../components/addForm/AuthForm'
import { reqGetRoles, reqAddRole, reqUpdateRole } from '../../api/role'
import memoryUtils from '../../utils/memoryUtils'
import { formatDate } from '../../utils/dateFormat'
import {
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd'

export default class Role extends Component {

  constructor (props) {
    super(props)

    this.authRef = React.createRef()

    this.state = {
      roles: [], // 所有角色的数组
      role: {}, // 当前选中的角色
      isShowAdd: false,
      isShowAuth: false
    }
  }

  initCol = () => {
    this.col = [
      {
        title: 'Role',
        dataIndex: 'name'
      },
      {
        title: 'Create Time',
        dataIndex: 'create_time',
        // render: (create_time) => {
        //   console.log(create_time)
        //   return formatDate(create_time, "yyyy-MM-dd hh:mm:ss")
        // }
      },
      {
        title: 'Authorization Time',
        dataIndex: 'auth_time',
        render: (auth_time) => formatDate(new Date(auth_time), "yyyy-MM-dd hh:mm:ss")
      },
      {
        title: 'Licensor',
        dataIndex: 'auth_name'
      }
    ]
  }

  onRow = (role) => {
    return {
      onClick: () => {
        if (this.state.role._id === role._id) {
          this.setState({
            role: {}
          })
        } else {
          this.setState({
            role
          })
        }
      }
    }
  }

  getRoles = async () => {
    const res = await reqGetRoles()
    if (res.status === 0) {
      const roles = res.data.map(role => {
        role.key = role._id
        return role
      })
      this.setState({
        roles
      })
    }
  }

  updateRole = async () => {
    const role = this.state.role
    // 得到最新的menus
    const menus = this.authRef.current.getMenus()

    role.menus = menus
    role.auth_name = memoryUtils.user.username
    role.auth_time = Date.now()
    // 发送请求
    const res = await reqUpdateRole(role)
    if (res.status === 0) {
      message.success('Update role succeed')
      this.setState({
        roles: [...this.state.roles],
        isShowAuth: false
      })
    } else {
      message.error('Update role failed')
    }
  }

  // 添加角色
  addRole = () => {
    // 收集输入数据
    this.formRef.current.validateFields().then(async value => {
      // console.log(value)  
      const {role} = value  
      // 请求
      const res = await reqAddRole(role)
      // 更新显示
      if (res.status === 0) {
        message.success('Add succeed')
        // this.getRoles()
        // 更新状态
        const role = res.data
        role.key = role._id
        // const roles = [...this.state.roles, role]
        // this.setState({
        //   isShowAdd: false,
        //   roles
        // })
        // 优化
        this.setState(state => ({
          roles: [...state.roles, role],
          isShowAdd: false
        }))
        // this.setState(state => {
        //   return {
        //     roles: [...state.roles, role],
        //     isShowAdd: false
        //   }
        // })
      } else {
        message.error(res.msg)
      }
    }).catch(() => {
      message.error('Error')
    })
  }

  handleCancel = () => {
    this.formRef.current.resetFields()
    this.setState({
      isShowAdd: false
    })
  }

  UNSAFE_componentWillMount () {
    this.initCol()
  }

  componentDidMount () {
    this.getRoles()
  }

  render() {

    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
        <Button 
          type="primary"
          onClick={() => this.setState({isShowAdd: true})} 
        >
          Create Role
        </Button> &nbsp;
        <Button 
          type="primary" 
          disabled={!role._id}
          onClick={() => this.setState({isShowAuth: true})}
        >
          Authorization
        </Button>
      </span>
    )

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    }

    return (
      <Card title={title}>
        <Table
          bordered
          dataSource={roles}
          columns={this.col}
          pagination={{defaultPageSize: 5}}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            rowSelection
          }}
          onRow={this.onRow}
        >
        </Table>
        <Modal
          title='Add Role'
          visible={isShowAdd} 
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <RoleAddForm 
            getFormRef={formRef => this.formRef = formRef}  
          />
        </Modal>
        <Modal
          title='Authorization'
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => this.setState({isShowAuth: false})}
        >
          <AuthForm ref={this.authRef} role={role}/>
        </Modal>
      </Card>
    )
  }
}