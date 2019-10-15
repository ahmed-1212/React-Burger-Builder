import React, { Component } from 'react';
import Aux from './hoc/Aux'
import { Route, Switch, Redirect } from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import Order from './containers/Oreder/Oreder'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';

class Router extends Component {
    render () {

        
        return (
            <Aux>
                
            </Aux>
        )
    }
};



export default connect(mapStateToProps)(Router);