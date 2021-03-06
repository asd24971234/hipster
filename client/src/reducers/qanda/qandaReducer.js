import { combineReducers } from 'redux'

const userQandaData = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERQANDA':
      return action.value
    case 'ADD_UserQandaDATA':
      return [...state, action.value]
    default:
      return state
  }
}

const productQandaData = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCTQANDA':
      return action.value
    default:
      return state
  }
}

//新增QA
const adduserQandaData = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_UserQandaDATA':
    //   return action.value
    default:
      return state
  }
}

const qandaReducer = combineReducers({
  userQandaData,
  productQandaData,
  // adduserQandaD ata,
})
export { qandaReducer }
