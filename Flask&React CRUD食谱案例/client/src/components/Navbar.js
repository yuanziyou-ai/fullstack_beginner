import React  from 'react'
import { Link } from 'react-router-dom'
import {useAuth,logout} from '../auth'

const LoggedInLinks=()=>{
  return(
    <>
    <li className="nav-item">
      <Link className="nav-link active" to="/create_recipe">创建食谱</Link>
    </li>
    <li className="nav-item">
      <a className="nav-link active" href="#" onClick={()=>{logout()}}>退出登录</a>
    </li>
    </>
  )
}
const LoggedOutLinks=()=>{
  return(
    <>
    <li className="nav-item">
      <Link className="nav-link active" to="/">主页</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/signup">注册</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/login">登录</Link>
    </li>
    </>
  )
}

const NavBar=()=>{

    const[logged]=useAuth()

    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand">食谱</p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {logged ? <LoggedInLinks/>:<LoggedOutLinks/>}
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default NavBar