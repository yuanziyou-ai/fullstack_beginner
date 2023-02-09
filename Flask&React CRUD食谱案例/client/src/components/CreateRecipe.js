import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const CreateRecipePage=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm()

    const createRecipe=(data)=>{
        console.log(data)
        
        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        console.log(token)

        const requestOptions={
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }
        
        fetch('http://localhost:5000/recipe/recipes',requestOptions)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
            .catch(err=>console.log(err))
    }
    return (
        <div className="container">
            <h1>创建食谱</h1>
            <form>
                <Form.Group>
                    <Form.Label>标题</Form.Label>
                    <Form.Control type="text"
                    {...register('title',{required:true,maxLength:25})}
                    />
                </Form.Group>
                {errors.title && <p style={{color:'red'}}><small>必须填写标题</small></p>}
                {errors.title?.type ==="maxLength" && <p style={{color:'red'}}><small>标题最长为25个字符</small></p>}
                <br></br>
                <Form.Group>
                    <Form.Label>描述</Form.Label>
                    <Form.Control as="textarea" rows={5}
                    {...register('description',{required:true,maxLength:255})}
                    />
                </Form.Group>
                {errors.description && <p style={{color:'red'}}><small>必须填写描述</small></p>}
                {errors.description?.type ==="maxLength" && <p style={{color:'red'}}><small>描述最长为25个字符</small></p>}
                <br></br>
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(createRecipe)}>保存</Button>
                </Form.Group>
                
            </form>
        </div>
    )
}

export default CreateRecipePage