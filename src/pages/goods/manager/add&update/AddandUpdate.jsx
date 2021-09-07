import React, { Component } from 'react'
import LinkButton from '../../../../components/linkButton/LinkButton'
import PicWall from './PicWall/PicWall'
import RichTextEditor from './richTextEditor/RichTextEditor'

import { reqGetCategory } from '../../../../api/category'
import { reqAddorUpdateGood } from '../../../../api/goods'

import { ArrowLeftOutlined } from '@ant-design/icons'

import {
  Card,
  Form,
  Input,
  Cascader,
  Button,
  message
} from 'antd'

 const {TextArea} = Input
 const {Item} = Form

// 产品的添加和更新子路由

export default class AddandUpdate extends Component {

  state = {
    optionLists: [],
    parentId: "0"
  }

  formRef = React.createRef()
  picWallRef = React.createRef()
  editorRef = React.createRef()

  UNSAFE_componentWillMount () {
    // 取出携带的数据
    const obj = this.props.location.state
    // 强制转换bool, 判断是要更新还是要添加物品
    this.isUpdate = !!obj
    // 保存商品，或空对象
    this.good = obj ? obj.good : {}
  }

  componentDidMount () {
    this.getCategory(this.state.parentId)
  }

  getCategory = async (parentId) => {
    const res = await reqGetCategory(parentId)
    if (res.status === 0) {
      const categories = res.data
      // 如果是一级分类
      if (parentId === "0") {
        this.updateCategory(categories)
      } else { // 否则返回二级列表
        return categories
      }
    }
  }

  updateCategory = async (cate) => {
    // 根据category数据生成optionlists
    const optionLists = cate.map(item => {
      const isLeaf = item.parentId === 0
      return ({
        value: item._id,
        label: item.name,
        isLeaf
      })
    })

    // 如果是一个二级分类商品的更新
    const {isUpdate, good} = this
    const {pCategoryId} = good
    if (isUpdate && pCategoryId !== '0') {
      // 获取对应的二级分类列表
      const res = await this.getCategory(pCategoryId)
      // 生成二级列表option.children
      const childrenOption = res.map(item => {
        return ({
          value: item._id,
          label: item.name,
          isLeaf: true
        })
      })
      // 找到一级列表，关联一级列表
      const targetOption = optionLists.find(item => item.value === pCategoryId)
      // console.log(targetOption)
      targetOption.children = childrenOption
      this.setState([...this.state.optionLists])
    }

    // update optionLists
    this.setState({
      optionLists
    })
  }

  handleSubmit = () => {
    this.formRef.current.validateFields().then(async value => {
      // 收集数据
      // 获取上传的图片
      const imgs = this.picWallRef.current.getImages()
      // 获取detail文字
      const detail = this.editorRef.current.getDetail()
      // console.log(value, imgs, detail)

      const {name, desc, price, categoryIds} = value
      let pCategoryId, categoryId
      if (categoryIds.length === 1) {
        pCategoryId = '0'
        categoryId = categoryIds[0]
      } else {
        pCategoryId = categoryIds[0]
        categoryId = categoryIds[1]
      }

      // 如果是添加商品，不需要商品id
      const good = {name, desc, price, imgs, detail, pCategoryId, categoryId}
      // 如果是更新商品，需要物品id
      if (this.isUpdate) {
        good._id = this.good._id
      }
      message.success('Validate succeed')

      // 调用接口更新或添加商品
      const res = await reqAddorUpdateGood(good)
      if (res.status === 0) {
        message.success('Succeed')
        // 返回商品界面
        this.props.history.goBack()
      } else {
        message.error('Failed')
      }
    }).catch(err => {
      message.error(err.msg)
    })
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 根据选中的分类来请求子分类
    const subCategory = await this.getCategory(targetOption.value)
    // 不显示isLoading
    targetOption.loading = false
    // 存在二级分类
    if (subCategory && subCategory.length > 0) {
      const childrenOption = subCategory.map(item => {
        return ({
          value: item._id,
          label: item.name,
          isLeaf: true
        })
      })
      // 关联到当前option
      targetOption.children = childrenOption
      this.setState([...this.state.optionLists])
    } else { // 无二级分类
      targetOption.isLeaf = true
    }
  };

  render() {

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{fontSize: '20px'}}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span style={{fontSize: '20px'}}>{this.isUpdate ? 'Update Good' : 'Add Good'}</span>
      </span>
    )

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 }
    }

    // 选中的categoryId默认数组
    const categoryIds = []
    const {pCategoryId, categoryId, imgs, detail} = this.good
    if (this.isUpdate) {
      // 如果是一级分类
      if (pCategoryId === '0') {
        categoryIds.push(pCategoryId)
      } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

    return (
      <Card title={title}>
        <Form 
          {...formItemLayout} 
          ref={this.formRef}
          onFinish={this.handleSubmit} 
          initialValues={{
            name: this.good.name,
            desc: this.good.desc,
            price: this.good.price,
            categoryIds
          }}
        >
          <Item label="Good Name:" 
            name="name"
            hasFeedback
            rules={[
              {type: 'string'},
              {required: true, message: 'Name can not be empty.'}
            ]}
          >
            <Input placeholder="Please input good name:" />
          </Item>

          <Item 
            name="desc" 
            label="Good Description:"
            rules={[
              {type: 'string'},
              {required: true, message: 'Description can not be empty.'}
            ]}
          >
            <TextArea 
              placeholder="Please input good description:" 
              autoSize={{minRows: 2, maxRows: 6}} 
            />
          </Item>

          <Item 
            name="price" 
            label="Good Price:"
            rules={[
              {type: 'string'},
              {required: true, message: 'Price can not be empty.'},
              {validator(_, value) {
                if (value * 1 < 0) {
                  return Promise.reject(new Error('Price can not less than 0.'))
                }
                return Promise.resolve()
              }}
            ]}
          >
            <Input addonAfter="$"/>
          </Item>

          <Item 
            label="Good Category:"
            name="categoryIds"
            rules={[
              {required: true}
            ]}
          >
            <Cascader
              placeholder="Please select good's category."
              options={this.state.optionLists}
              loadData={this.loadData}
              expandTrigger="click"
            />
          </Item>

          <Item 
            label="Good Images:"
            rules={[
              {required: true}
            ]}
          >
            <PicWall ref={this.picWallRef} imgs={imgs}/>
          </Item>

          <Item label="Good Detail:" labelCol={{span: 6}} wrapperCol={{span: 12}}>
            <RichTextEditor ref={this.editorRef} detail={detail}/>
          </Item>

          <Item style={{transform: 'translateX(40%)'}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>

        </Form>
      </Card>
    )
  }
}
