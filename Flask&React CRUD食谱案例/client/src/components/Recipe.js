import React from 'react'
import {Button, Card,Modal} from 'react-bootstrap'

const Recipe=({title,description,onClick,onDelete})=>{
    return(
        <Card>
            <Card.Body className="recipe">
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
                <Button variant='primary' onClick={onClick}>更新</Button>
                {''}
                <Button variant='danger' onClick={onDelete}>删除</Button>
            </Card.Body>

        </Card>
    )
}

export default Recipe