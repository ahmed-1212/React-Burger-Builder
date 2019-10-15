import React from 'react';

import Burger from '../../Burger/Burger';
import classes  from './CheckOutSummary.css';
import Button from '../../UI/Button/Button'

const CheckOutSummary = (props) => {
    return (

        <div className={classes.CheckOutSummary}>
            <h1>We Hope You Like The Test</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutCancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.checkoutContinue} btnType="Success">Continue</Button>
        </div>
    )
}

export default CheckOutSummary;