import React from 'react';

import classes from './BuildControl.css';

const BurgerControl = props => (

    <div className={classes.BuildControl}>
        
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removing} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.adding} >More</button>
    </div>

)

export default BurgerControl;