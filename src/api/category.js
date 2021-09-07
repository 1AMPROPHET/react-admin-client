import { request } from "./axios";

export function reqGetCategory (parentId) {
  return request({
    url: '/manage/category/list',
    params: {
      parentId
    }
  }, 'get')
}

export function reqAddCategory (categoryName, parentId) {
  return request({
    url: '/manage/category/add',
    data: {
      categoryName, 
      parentId
    }
  })
}

export function reqUpdateCategory (categoryId, categoryName) {
  return request({
    url: '/manage/category/update',
    data: {
      categoryId,
      categoryName
    }
  })
}