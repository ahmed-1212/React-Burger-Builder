import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const NavigationItems = props => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        {props.isSign ? <NavigationItem link="/order">Orders</NavigationItem> : null}
        {props.isSign ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Signup</NavigationItem>}
    </ul>
)


const mapStateToProps = state => {
    return {
        isSign: state.auth.isSign
    }
    
}

export default connect(mapStateToProps)(NavigationItems);