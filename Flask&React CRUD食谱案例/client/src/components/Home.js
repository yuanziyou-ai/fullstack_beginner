import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../auth'
import Recipe from './Recipe'
import {Form,Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const LoggedinHome=()=>{
    const[recipes,setRecipes]=useState([]);
    const [show,setShow]=useState(false)
    const {register,handleSubmit,setValue,reset,formState:{errors}}=useForm()
    const[recipeId,setRecipeId]=useState(0)

    useEffect(
        ()=>{
            fetch('http://localhost:5000/recipe/recipes')
            .then(res=>res.json())
            .then(data=>{
                setRecipes(data)
            })
            .catch(err=>console.log(err))
        },[]
    );


    const closeModal=()=>{
        setShow(false)
    }
    const showModal=(id)=>{
        setShow(true)
        setRecipeId(id)
        recipes.map(
            (recipe)=>{
                if(recipe.id==id){
                    setValue('title',recipe.title)
                    setValue('description',recipe.description)
                }
            }
        )
    }
    let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const updateRecipe=(data)=>{
        console.log(data)

        console.log(token)
        console.log(recipeId)
        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }
        
        fetch(`http://localhost:5000/recipe/recipe/${recipeId}`,requestOptions)
            .then(res=>res.json())
            .then(data=>{
                const reload =window.location.reload()
                reload()
                console.log(data)
            })
            .catch(err=>console.log(err))
    }
    const deleteRecipe=(id)=>{
        console.log(id)

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            }
        }
        
        fetch(`http://localhost:5000/recipe/recipe/${id}`,requestOptions)
            .then(res=>res.json())
            .then(data=>{
                const reload =window.location.reload()
                reload()
                console.log(data)
            })
            .catch(err=>console.log(err))
    }
    return(
        <div className="recipes">
        <Modal
            show={show}
            size="lg"
            onHide={closeModal}
        >
            <Modal.Header claseButton>
                <Modal.Title>
                    更新食谱
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <Button variant="primary" onClick={handleSubmit(updateRecipe)}>保存</Button>
                </Form.Group>
                
            </form>
            </Modal.Body>
        </Modal>
        
            <h1>食谱列表</h1>
            {
                recipes.map(
                    (recipe,index)=>(
                        <Recipe title={recipe.title} description={recipe.description}
                        key={index}
                        onClick={()=>{showModal(recipe.id)}}
                        onDelete={()=>{deleteRecipe(recipe.id)}}
                        />
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome=()=>{
    return(
        <div className="home container">
            <h1 className="heading">Welcome to the Recipes</h1>
            <Link  className="btn btn-primary btn-lg" to="/login">开始使用</Link>
        </div>
    )
}
const HomePage=()=>{
    const [logged] =useAuth()
    return (
        <div>
            {logged ? <LoggedinHome/>:<LoggedOutHome/>}
        </div>

    )
}

export default HomePage