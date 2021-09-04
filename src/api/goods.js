import { request } from "./axios";

export function reqGoods (pageNum, pageSize) {
  return request({
    url: '/manage/product/list',
    params: {
      pageNum,
      pageSize
    }
  }, 'get')
}

// 商品搜索请求
export function reqSearch ({pageNum, pageSize, searchName, searchType}) {
  return request({
    url: '/manage/product/search',
    params: {
      pageNum,
      pageSize,
      [searchType]: searchName
    }
  }, 'get')
}

export function reqCategory (categoryId) {
  return request({
    url: '/manage/category/info',
    params: {
      categoryId
    }
  }, 'get')
}

export function reqUpdateStatus (productId, status) {
  return request({
    url: '/manage/product/updateStatus',
    data: {
      productId,
      status
    }
  })
}

export function reqDeleteImg (name) {
  return request({
    url: '/manage/img/delete',
    data: {
      name
    }
  })
}


export function reqAddorUpdateGood (good) {
  return request({
    url: '/manage/product/' + ( good._id ? 'update' : 'add' ),
    data: good
  })
}

// export function reqUpdateGood (good) {
//   return({
//     url: '/manage/product/update',
//     data: {

//     }
//   })
// }