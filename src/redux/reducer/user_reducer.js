// user 的 reducer

import storageUtils from '../../utils/storageUtils'
import { RECEIVE_USER, RESSET_USER, SHOW_ERROR_MSG } from '../action-types'

const initUser = storageUtils.getUser()

export default function userReducer (state = initUser, action) {
  const {type, user, errorMsg} = action
  switch (type) {
    case RECEIVE_USER:
      return user
    case SHOW_ERROR_MSG:
      return {...state, errorMsg}
    case RESSET_USER: 
      return {}
    default:
      return state
  }
}