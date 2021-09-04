import React, { Component } from 'react'
import LinkButton from '../../../components/linkButton/LinkButton'
import AddForm from '../../../components/addForm/AddForm'
import UpdateForm from '../../../components/updateForm/UpdateForm'

import { reqGetCategory, reqUpdateCategory, reqAddCategory } from '../../../api/category'

import { Card, Button, Table, Space, Modal, message } from 'antd'
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons'

export default class Category extends Component {

  state = {
    category: [], // table数据源
    isLoading: false, // 加载动画
    parentId: '0', // 当前的分类列表的parentId
    parentName: '', // 分类名称
    subCategory: [], // 子分类列表
    showAddStatus: false, // 标识添加的确认框是否显示
    showUpdateStatus: false, // 标识更新的确认框是否显示
    firstCategoryCol: [
      {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>
      },
      {
        title: 'Method',
        width: '280px',
        render: (category) => (
          // 方法选项显示的文本
          <Space size="small">
            <LinkButton onClick={this.showUpdateCategory(category)}>
              Change Category
            </LinkButton>
            {/* 高级函数，函数柯里化 */}
            {/* 没有子分类不显示 */}
            {
              this.state.parentId === '0' ? 
              <LinkButton onClick={this.showSubmenu(category)}>
                SubCategory
              </LinkButton> : null
            }
          </Space>
        )
      }
    ]
  }

  componentDidMount () {
    this.getCategory(this.state.parentId)
  }

  componentDidUpdate () {
    // 清除缓存
    if (this.formRef !== undefined) {
      this.formRef.current.resetFields()
    }
    // if (this.addFormRef !== undefined) {
    //   this.addFormRef.current.resetFields()
    // }
  }

  // parentId不指定，使用状态中的值
  getCategory = (parentId) => {
    this.setState({
      isLoading: true
    })
    reqGetCategory(parentId).then(res => {
      // 取出分类列表，可能是一级分类，也可能是二级分类
      // 一级分类
      if (parentId === '0') {
        if (res.status === 0) {
          this.setState({
            category: res.data,
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      } 
      // 二级分类
      else {
        if (res.status === 0) {
          this.setState({
            subCategory: res.data,
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      }
    })
  }

  // 显示子分类
  showSubmenu = (category) => {
    return () => {
      this.setState({
        parentId: category._id,
        parentName: category.name
      }, () => {  // callBack函数在状态更新和页面render结束后执行
        this.getCategory(this.state.parentId)
      })
    }
  }

  // 返回一级分类
  showFirstCategory = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategory: []
    })
  }

  // 显示添加确认框
  showAddCategory = () => {
    this.setState({
      showAddStatus: true
    })
  }

  showError = (err) => {
    message.error(err)
  }

  // 添加分类
  addCategory = () => {
    // 验证
    this.formRef.current.validateFields().then(values => {
      // 隐藏Modal
      this.setState({
        showAddStatus: false
      })
      // 收集数据，发送请求
      const {parentId, categoryName} = values
      reqAddCategory(categoryName, parentId).then(res => {
        if (res.status === 0) {
          // 添加的分类就是当前分类,不需要更新一节列表
          if (parentId === this.state.parentId)
            this.getCategory(this.state.parentId)
          // 在二级列表中添加一级分类,需要更新一级列表
          else if (parentId === '0') {
            this.getCategory('0')
          }
        }
      })
    }).catch(err => {
      this.showError(err.errorFields[0].errors[0])
    }) 
  }

  // 显示分类确认框
  showUpdateCategory = (category) => {
    return () => {
      this.currentCategory = category
      this.setState({
        showUpdateStatus: true
      })
    }
  }

  // 更新分类
  updateCategory = () => {
    // 表单验证，通过了才处理
    this.formRef.current.validateFields().then(value => {
      // 隐藏确认框
      this.setState({
        showUpdateStatus: false
      })
      // 获取id,categoryName
      const categoryId = this.currentCategory._id
      // const categoryName = this.formRef.current.getFieldValue('categoryName')
      const categoryName = value.categoryName
      // 发送请求更新列表
      reqUpdateCategory(categoryId, categoryName).then(res => {
        // 显示新列表
        if (res.status === 0) {
          this.getCategory(this.state.parentId)
        }
      })
    }).catch(err => {
      this.showError(err.errorFields[0].errors[0])
    })
  }

  handleCancel = () => {
    // 隐藏
    this.setState({
      showAddStatus: false,
      showUpdateStatus: false
    })
  }

  render() {

    const { 
      category, 
      subCategory,
      parentId,
      parentName,
      isLoading, 
      showAddStatus,
      showUpdateStatus,
      firstCategoryCol
    } = this.state

    const title = parentId === '0' ? 'First Category' : (
      <span>
        <LinkButton 
          onClick={this.showFirstCategory}
        >
          First Category  
        </LinkButton>
        <ArrowRightOutlined/>
        <span>  {parentName}</span>
      </span>
    )

    const extra = (
      <Button 
        type="primary"
        onClick={this.showAddCategory}
      >
        <PlusOutlined/>
        Add
      </Button>
    )

    return (
      <div className="category">
        <Card 
          title={title} 
          extra={extra} 
          bordered={true}
          bodyStyle={{height: '500px'}}
        >
          <Table 
            columns={firstCategoryCol} 
            dataSource={parentId === '0' ? category : subCategory} 
            bordered={true} 
            rowKey="_id"
            loading={isLoading}
            pagination={{
              pageSize: 6, 
              position: "bottomRight",
              showQuickJumper: true,
              showTotal: (
                total => `Total ${total} categories`
              )
            }}
          />

          <Modal
            title='Add Category'
            visible={showAddStatus} 
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm 
              category={category} 
              parentId={parentId}
              getFormRef={formRef => this.formRef = formRef}  
            />
          </Modal>
          <Modal
            title='Update Category'
            visible={showUpdateStatus} 
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm 
              currentCategory={
                this.currentCategory ? this.currentCategory.name : ''
              }
              getFormRef={formRef => this.formRef = formRef}
            />
          </Modal>
        </Card>
      </div>  
    )
  }
}
