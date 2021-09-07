import { request } from "./axios";

export function reqGetRoles () {
  return request({
    url: '/manage/role/list'
  }, 'get')
}

export function reqAddRole (roleName) {
  return request({
    url: '/manage/role/add',
    data: {
      roleName
    }
  })
}

export function reqUpdateRole (role) {
  return request({
    url: '/manage/role/update',
    data: {
      ...role
    }
  })
}