import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm () {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    //取消事件的默认动作
    //比如 一个 submit 按钮，点击的默认动作就是 提交表单，比如您要 执行一个 ajax 请求，不想让它 自动提交 表单，那就得用 这个 函数 阻止它的 默认动作

    e.preventDefault()


    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>目标</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            添加目标
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
