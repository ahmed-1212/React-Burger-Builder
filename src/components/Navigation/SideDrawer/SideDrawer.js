import React from 'react';
import classes from'./SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux'


const SideDrawer = props => {

    let sideDrawerState = [classes.SideDrawer, classes.Close];

    if (props.open) {
        sideDrawerState = [classes.SideDrawer, classes.Open]
    }
    return (

        <Aux>
            <Backdrop show={props.open} clicked={props.closeSideDrawer}/>
            <div className={sideDrawerState.join(' ')} onClick={props.closeSideDrawer}>
                <Logo height="11%" margin="20px"/>
                <NavigationItems />
            </div>
        </Aux>
    )
}

export default SideDrawer;
