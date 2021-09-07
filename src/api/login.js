import {request} from './axios'

export function login(userInfo) {
  return request({
    url: '/login',
    data: userInfo
  })
}