import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl'
import classes from './BurgerControls.css';

const controls = [
    {'label': 'Salad', 'type': 'salad'},
    {'label': 'Bacon', 'type': 'bacon'},
    {'label': 'Cheese', 'type': 'cheese'},
    {'label': 'Meat', 'type': 'meat'},
]

const BurgerControls = props => (

    <div className={classes.BurgerControls}>
        <h3 style={{color: '#fff'}}>Burger Price: {props.price.toFixed(2)}</h3>
        {controls.map(ctrl => (
             <BurgerControl
              key={ctrl.label} 
              label={ctrl.label} 
              adding={() => props.addIngredients(ctrl.type)}
              removing={() => props.removeIngredients(ctrl.type)}
              disabled={props.disabled[ctrl.type]}
              />
        ))}
        <button 
        disabled={!props.purchasable} 
        className={classes.OrderButton} 
        onClick={props.ordering}>{props.isAuth ? 'Order Now' : 'Sign Up To Order'}</button>
    </div>
);


export default BurgerControls;