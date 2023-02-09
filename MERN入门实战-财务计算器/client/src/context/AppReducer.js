// useReducer 的判断，返回state等参数
export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,//对象的扩展运算符（…)是ES6中对数组的一种拓展，用于取出参数对象的所有可遍历属性，并复制到当前对象中。
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}