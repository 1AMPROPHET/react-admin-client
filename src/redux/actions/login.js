// 登录的异步action

import store from "../store";
import { RECEIVE_USER, RESSET_USER, SHOW_ERROR_MSG } from "../action-types";
import {login} from '../../api/login'
import storageUtils from "../../utils/storageUtils";
import { message } from "antd";

// 接受用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, user})
// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})
// 退出登录的action
export const logout = () => {
  // 清除local中的user
  storageUtils.removeUser()
  // 再返回action对象
  return {type: RESSET_USER}
}

export const loginAction = (userInfo) => {
  return async () => {
    // 执行异步ajax请求
    const res = await login(userInfo)
    // 成功
    if (res.status === 0) {
      message.success('Login succeed')
      const user = res.data
      // 保存到local中
      storageUtils.saveUser(user)
      // 分发action
      store.dispatch(receiveUser(user))
    } else {
      const msg = res.msg
      store.dispatch(showErrorMsg(msg))
    }
  }
}
