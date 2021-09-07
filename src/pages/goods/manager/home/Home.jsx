import React, { Component } from 'react'
import LinkButton from '../../../../components/linkButton/LinkButton'
import { reqGoods, reqSearch, reqUpdateStatus } from '../../../../api/goods'
import { PAGE_SIZE} from '../../../../assets/text/pageInstance'
import { 
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'
import { 
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'

import './home.less'

const {Option} = Select

// 商品的默认子路由组件

export default class ProductHome extends Component {

  state = {
    goods: [],
    total: 0,
    loading: false,
    searchName: '',
    searchType: 'productName'
  }

  UNSAFE_componentWillMount () {
    this.initailCol()
  }

  componentDidMount () {
    this.getGoods(1)
  }

  initailCol = () => {
    this.CategoryCol = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Discription',
        dataIndex: 'desc',
        width: '280px',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => {
          return `${price}`
        }
      },
      {
        title: 'Status',
        render: (product) => {
          const {_id, status} = product
          return (
            <span>
              <Button 
                type="primary" 
                onClick={this.updateStatus(_id, status === 1 ? 2 : 1)}
              >
                {status === 1 ? 'Pull Off' : 'Put Up'}
              </Button>
              <span>{status === 1 ? ' Selling' : ' Taken Off'}</span>
            </span>
          )
        }
      },
      {
        title: 'Methods',
        render: (good) => {
          return (
            <span>
              <LinkButton 
                onClick={() => this.props.history.push('/product/detail', {good})}
              >
                Detail
              </LinkButton>
              <LinkButton 
                onClick={() => this.props.history.push('/product/add&update', {good})}  
              >
                Change
              </LinkButton>
            </span>
          )
        }
      }
    ]
  }

  updateStatus = (productId, status) => {
    return async () => {
      const res = await reqUpdateStatus(productId, status)
      if (res.status === 0) {
        message.success('Update Succeed.')
        this.getGoods(this.pageNum)
      } else {
        message.error('Update Failed.')
      }
    }
  }

  getGoods = (pageNum) => {
    this.pageNum = pageNum
    this.setState({
      loading: true
    })
    const {searchName, searchType} = this.state
    if (searchName === '') {
      reqGoods(pageNum, PAGE_SIZE).then(res => {
        if (res.status === 0) {
          // 数据有些问题，没有key，添加key
          const data = res.data.list.map(item => {
            item.key = item._id
            return item
          })
          this.setState({
            goods: data,
            total: res.data.total,
            loading: false
          })
        }
      }).catch(err => {
        console.log(err)
        this.setState({loading: false})
      })
    } else {
      const obj = {
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      }
      reqSearch(obj).then(res => {
        const data = res.data.list.map(item => {
          item.key = item._id
          return item
        })
        this.setState({
          goods: data,
          total: res.data.total,
          loading: false
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
    }
  }

  render() {

    const {goods, total, loading, searchName, searchType} = this.state

    const title = (
      <span className="header">
        <Select 
          defaultValue={searchType} 
          className="select" 
          onChange={value => this.setState({searchType: value})}
        >
          <Option value='productName'>Search by name</Option>
          <Option value='productDesc'>Search by discription</Option>
        </Select>
        <Input 
          className="input" 
          type="text" 
          value={searchName}
          placeholder="Key Words"
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type="primary" onClick={() => this.getGoods(1)}>
          <SearchOutlined/>
          Search
        </Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/add&update')}>
        <PlusOutlined/>
        Add
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          columns={this.CategoryCol}
          dataSource={goods}
          pagination={{
            current: this.pageNum,
            pageSize: PAGE_SIZE, 
            position: "bottomRight",
            showQuickJumper: true,
            total: total,
            onChange: this.getGoods
          }}
          loading={loading}
        >

        </Table>
      </Card>
    )
  }
}
