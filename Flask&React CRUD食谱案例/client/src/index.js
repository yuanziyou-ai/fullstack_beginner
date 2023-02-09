import React from 'react'
// 把创建的react元素渲染到页面中
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css'
import NavBar from './components/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import { createRoot } from 'react-dom/client';
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import CreateRecipePage from './components/CreateRecipe';

// 钩子函数调用api接口
const App=()=>{
    
    return(
        <Router>
        <div className="">
            <NavBar/>
            <Switch>
                <Route path="/create_recipe"> 
                    <CreateRecipePage/>
                </Route>
                <Route path="/login"> 
                    <LoginPage/>
                </Route>
                <Route path="/signup"> 
                    <SignUpPage/>
                </Route>                
                <Route path="/"> 
                    <HomePage/>
                </Route>
            </Switch>
        </div>
        </Router>
    )
}
// 将模板转为 HTML 语言，并插入指定的 DOM 节点
// 第一个是创建的模板,多个dom元素外层需使用一个标签进行包裹，如 <div>；
// 第二个参数是插入该模板的目标位置。
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
