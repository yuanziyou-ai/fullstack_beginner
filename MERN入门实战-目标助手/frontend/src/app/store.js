// Redux Toolkit包旨在成为编写Redux逻辑的标准方式。它最初的创建是为了帮助解决关于 Redux 的三个常见问题：
// 1 配置 Redux 存储太复杂了
// 2 我必须添加很多包才能让 Redux 做任何有用的事情
// 3 Redux 需要太多样板代码
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
// Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的
// 记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
//configureStore替代 createStore
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})
