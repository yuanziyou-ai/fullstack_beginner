import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>目标助手</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> 注销
            </button>
          </li>
        ) : (
          // <></>它主要用于不需要一个实体的父元素或者是根元素去包裹的情况
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> 登录
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> 注册
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
