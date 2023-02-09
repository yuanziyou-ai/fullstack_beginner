import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {login} from '../auth'
import {useHistory} from 'react-router-dom'

const LoginPage=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm()

    const history=useHistory()

    const loginUser=(data)=>{
        console.log(data)

        const requestOptions={
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch('http://localhost:5000/auth/login',requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.access_token)
            login(data.access_token)

            history.push('/')
        })
        reset()
    }

    return (
        <div className="container">
            <div className="form">
                <h1>登录</h1>
                <form>
                    <br/>
                    <Form.Group>
                        <Form.Label>用户名</Form.Label>
                        <Form.Control type="text" placeholder="请输入你的姓名"
                        {...register('username',{required:true,maxLength:25})}
                        ></Form.Control>
                    </Form.Group>
                    {errors.username && <p style={{color:'red'}}><small>必须填写用户名</small></p>}
                    {errors.username?.type ==="maxLength" && <p style={{color:'red'}}><small>用户名最长为25个字符</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>密码</Form.Label>
                        <Form.Control type="password" placeholder="请输入密码" 
                        {...register('password',{required:true,minLength:8})}></Form.Control>
                    </Form.Group>
                    {errors.password && <p style={{color:'red'}}><small>必须填写密码</small></p>}
                    {errors.password?.type ==="minLength" && <p style={{color:'red'}}><small>密码最短为8个字符</small></p>}
                    <br/>
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>登录</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small >没有登陆账号?<Link to="/signup"> 注册新用户</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}

export default LoginPage