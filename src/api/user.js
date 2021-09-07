import { request } from "./axios";

export function reqGetUser () {
  return request({
    url: '/manage/user/list',
  }, 'get')
}

export function reqDeleteUser (userId) {
  return request({
    url: '/manage/user/delete',
    data: {
      userId
    }
  })
}

export function reqAddOrUpdateUser (user) {
  return request({
    url: '/manage/user/' + (user._id ? 'update' : 'add'),
    data: {
      ...user
    }
  })
}