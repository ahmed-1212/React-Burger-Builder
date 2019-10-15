import React from 'react';
import classes from './Orders.css';

const Orders = props => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span 
        style={{
            display: 'inline-block', 
            margin: '10px',
            padding: '5px 10px',
            border: '1px solid #ccc'
        }} 
        key={ig.name}> {ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Orders}>
            <p>Your Ingredients are: {ingredientsOutput} </p>
            <p>Your Total Price Is: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Orders