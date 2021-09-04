import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../../../assets/text/pageInstance'
import LinkButton from '../../../../components/linkButton/LinkButton'
import { reqCategory } from '../../../../api/goods'

import './detail.less'

const { Item } = List

// 详情页

export default class Detail extends Component {

  state = {
    cName1: '',
    cName2: ''
  }

  componentDidMount () {
    this.getCategory()
  }

  getCategory = async () => {
    const {pCategoryId, categoryId} = this.props.location.state.good
    if (pCategoryId === 0) {
      // reqCategory(categoryId).then(res => {
      //   console.log(res)
      //   this.setState({
      //     cName1: res.data.name
      //   })
      // })
      const res = await reqCategory(categoryId)
      this.setState({
        cName1: res.data.name
      })
    } else {
      // 效率略低: 后面的请求是在前一个请求成功返回后才发送
      // // 一级分类
      // const res1 = await reqCategory(pCategoryId)
      // // 二级分类
      // const res2 = await reqCategory(categoryId)
      // 需要的效果：一次性发送多个请求，都成功了才正常处理: Promise.all()
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      this.setState({
        cName1: results[0].data.name,
        cName2: results[1].data.name
      })
    }
  }

  render() {

    const {name, desc, price, detail, imgs} = this.props.location.state.good
    const {cName1, cName2} = this.state

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined style={{marginRight: '10px', fontSize: '20px'}}/>
        </LinkButton>
        <span>Detail</span>
      </span>
    )

    return (
      <Card title={title} className="good-detail">
        <List>
          <Item>
            <span className="left">Good Name:</span>
            <span className="text">{name}</span>
          </Item>
          <Item>
            <span className="left">Good Description:</span>
            <span className="text">{desc}</span>
          </Item>
          <Item>
            <span className="left">Good Price:</span>
            <span className="text">{price}</span>
          </Item>
          <Item>
            <span className="left">Good Category:</span>
            <span className="text">{cName1} {cName2 ? '---> ' + cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">Good Images:</span>
            <span className="text">
              {
                imgs.map(img => {
                  return (
                    <img src={BASE_IMG_URL + img} alt="xxx" key={img}/>
                  )
                })
              }
            </span>
          </Item>
          <Item>
            <span className="left">Good Details:</span>
            <span className="text" dangerouslySetInnerHTML={{__html: detail}}>

            </span>
          </Item>
        </List>
      </Card>
    )
  }
}
