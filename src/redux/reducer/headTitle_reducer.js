// 头部标题的reducer
import { SET_HEAD_TITLE } from "../action-types";

const initHeadTitle = 'Home'

export default function headTitleReducer (state = initHeadTitle, action) {
  const {type, data} = action
  switch (type) {
    case SET_HEAD_TITLE:
      return data
    default:
      return state
  }
}