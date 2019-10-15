import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import menuIcon from '../../../assets/images/icon.png'


const Toolbar = props => (

    <header className={classes.Toolbar}>
        <div className={classes.icon} onClick={props.open}><img style={{width: '20px', cursor: 'pointer'}}src={menuIcon}  alt="Menu Icon"/></div>
        <Logo height="80%"/>
        <nav className={classes.DeskTop}><NavigationItems /></nav>
    </header>
)

export default Toolbar;