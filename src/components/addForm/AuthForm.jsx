import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {menuList} from '../../assets/text/left-nav-statics'
import { 
  Form,
  Input,
  Tree
} from 'antd'

const { Item } = Form

// category中添加的form

export default class AuthForm extends Component {

  constructor (props) {
    super(props)
    this.treeNodes = this.getTreeNodes()
    const {menus} = props.role
    this.state = {
      checkedKeys: menus
    }
  }

  static propTypes = {
    role: PropTypes.object.isRequired
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      checkedKeys: nextProps.role.menus || []
    })
  }

  // 生成树状数组
  getTreeNodes = () => {
    const tree = menuList.map(item => {
      return ({
        title: item.text,
        key: item.link,
        children: item.subMenu ? item.subMenu.map(subItem => {
          return ({
            title: subItem.text,
            key: subItem.link
          })
        }) : null
      })
    })
    const root = [
      {
        title: 'Authorization',
        key: 'all',
        children: tree
      }
    ]
    return root
  }

  // 为父组件提供最新menus
  getMenus = () => {
    return this.state.checkedKeys
  }

  onCheck = (checkedKeys) => {
    this.setState(() => ({
      checkedKeys: checkedKeys 
    }))
  }

  render() {

    const {role} = this.props
    const {checkedKeys} = this.state

    return (
      <Form>
        <Item>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable={true}
          checkedKeys={checkedKeys}
          treeData={this.treeNodes}
          defaultExpandAll={true}
          onCheck={this.onCheck}
        />
      </Form>
    )
  }
}
