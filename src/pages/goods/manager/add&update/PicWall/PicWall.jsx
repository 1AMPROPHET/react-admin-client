import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../../../../assets/text/pageInstance'

import { reqDeleteImg } from '../../../../../api/goods';

import PropTypes from 'prop-types'

export default class PicWall extends Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  constructor (props) {
    super(props)

    let fileList = []
    const {imgs} = this.props
    if (imgs && imgs.length !== 0) {
      fileList = imgs.map((img, index) => {
        return ({
          uid: -index,
          name: img,
          status: 'done',
          url: BASE_IMG_URL + img
        })
      })
    }

    this.state = {
      previewVisible: false,
      previewTitle: '',
      previewImage: '',
      fileList
    }
  }

  getImages = () => {
    return this.state.fileList.map(file => file.name)
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  // 显示预览图
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 更新状态
  handleChange = async ({ file, fileList }) => {
    console.log(file.status, fileList.length, file === fileList[fileList.length - 1])
    // 一旦上传成功，将当前上传的file的信息修正
    if(file.status === 'done') {
      const res = file.response
      if (res.status === 0) {
        message.success('Upload succeed')
        const {name, url} = res.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('Upload failed')
      }
    } else if (file.status === 'removed') {
      const res = await reqDeleteImg(file.name)
      if (res.status === 0) {
        message.success('Image deleted')
      } else {
        message.error('Delete failed')
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/proxy/manage/img/upload" // 上传图片的接口
          accept="image/*" // 只接受图片
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
