import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard () {
  const navigate = useNavigate()//重定向hook
  const dispatch = useDispatch()//返回Redux store中对dispatch函数的引用。

  //用useSelector从全局中获取数据
  const { user } = useSelector((state) => state.auth)

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  // console.log("goals:" + JSON.stringify(isLoading))
  useEffect(() => {
    if (isError) {
      console.log("useEffect:isError" + message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>欢迎， {user && user.name}</h1>
        <p>目标驱动，高效人生</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>你还没有设置目标哦，加油</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
