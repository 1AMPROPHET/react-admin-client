import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Form, 
  Select, 
  Input 
} from 'antd'

const { Item } = Form
const { Option } = Select

// category中添加的form

export default class AddForm extends Component {

  formRef = React.createRef()

  static propTypes = {
    getFormRef: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired, // 一级分类
    parentId: PropTypes.string.isRequired // parentId
  }

  UNSAFE_componentWillMount () {
    this.props.getFormRef(this.formRef)
  }

  render() {

    const {category, parentId} = this.props

    return (
      <Form ref={this.formRef} initialValues={{parentId: parentId, categoryName: ''}}>
        <Item name="parentId">
          <Select>
            <Option value='0'>First Category</Option>
            {
              category.map(item => {
                return <Option key={item._id} value={item._id}>{item.name}</Option>
              })
            }
          </Select>
        </Item>
        <Item 
          name="categoryName"
          rules={[
            {type: 'string'},
            {required: true, message: 'CategoryName can not be empty'}
          ]}
        >
          <Input 
            autoFocus="autofocus" 
            placeholder="Please input category name."
          />
        </Item>
      </Form>
    )
  }
}
