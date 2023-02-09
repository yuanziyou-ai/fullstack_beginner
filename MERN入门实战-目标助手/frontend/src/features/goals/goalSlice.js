import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'//更便捷的创建 Store、reducer、action creator。
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// createAsyncThunk方法可以创建一个异步的action，这个方法被执行的时候会有三个( pending(进行中) fulfilled(成功) rejected(失败))状态。可以监听状态的改变执行不同的操作
//https://redux-toolkit.js.org/api/createAsyncThunk
// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {//thunkAPI: an object containing all of the parameters that are normally passed to a Redux thunk function
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//对于在 slice 的 reducer 中不存在的 action，要在 slice 的 extraReducers 字段进行添加。
//使用 createAsyncThunk 创建的 thunk 函数之后，要将其三种状态添加到 extraReducers 函数中。
//基本可以参照这种模板写法即可;reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
// goalSlice.actions 导出所有的修改函数,方便页面使用
// goalSlice.reducer 导出reducer在 store里面使用
