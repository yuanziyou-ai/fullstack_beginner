import React, { useState } from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
 
const SignUpPage=()=>{


    const {register,watch,handleSubmit,reset,formState:{errors}}=useForm();
    const [show,setShow]=useState(true)
    const [serverResponse,setServerResponse]=useState('')

    const submitForm=(data)=>{
        if(data.password===data.confirmPassword){
        
        const body={
            username:data.username,
            email:data.email,
            password:data.password
        }
        const requestOptions={
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(body)
        }
        
        fetch('http://localhost:5000/auth/signup',requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setServerResponse(data.message)
            console.log(serverResponse)

            setShow(true)
        })
        .catch(err=>console.log(err))

        // 表单重置
        reset()
        }else {
            alert("密码不一致!")
        }
}
    console.log(watch("username"));
    console.log(watch("email"));
    console.log(watch("password"));
    console.log(watch("confirmpassword"));
    return (
        <div className="container">
            <div className="form">
                {show?
                <>
                <h1>注册</h1>
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <p>
                    {serverResponse}
                </p>
                </Alert>
                </>
                :
                <h1>注册</h1>
                }
                <form>
                    <br/>
                    <Form.Group>
                        <Form.Label>用户名</Form.Label>
                        <Form.Control type="text" placeholder="请输入你的姓名" 
                        {...register("username",{required:true,maxLength:25})}
                        ></Form.Control>
                        {errors.username && <span style={{color:"red"}}>必须填写用户名!</span>}
                        <br/>
                        {errors.username?.type==="maxLength"&& <span style={{color:"red"}}>用户名最长为25个字符</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>邮箱</Form.Label>
                        <Form.Control type="email" placeholder="请输入你的邮箱" 
                        {...register("email",{required:true,maxLength:80})}
                        ></Form.Control>
                        {errors.email && <span style={{color:"red"}}>必须填写邮箱!</span>}
                        <br/>
                        {errors.email?.type==="maxLength"&& <span style={{color:"red"}}>邮箱最长为80个字符</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>密码</Form.Label>
                        <Form.Control type="password" placeholder="请输入密码" 
                        {...register("password",{required:true,minLength:8})}
                        ></Form.Control>
                        {errors.password && <span style={{color:"red"}}>必须填写密码!</span>}
                        <br/>
                        {errors.password?.type==="minLength"&& <span style={{color:"red"}}>密码最短为8个字符</span>}
                    </Form.Group>
                    <br></br>                   
                    <Form.Group>
                        <Form.Label>确认密码</Form.Label>
                        <Form.Control type="confirmPassword" placeholder="请再次输入密码"
                        {...register("confirmPassword",{required:true,minLength:8})}
                         ></Form.Control>
                        {errors.confirmPassword && <span style={{color:"red"}}>再次填写密码!</span>}
                        <br/>
                        {errors.confirmPassword?.type==="minLength"&& <span style={{color:"red"}}>密码最短为8个字符</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>注册</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>已经注册账号<Link to="/login">去登录</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}

export default SignUpPage