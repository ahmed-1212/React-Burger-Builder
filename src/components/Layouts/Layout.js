import React, { useState } from 'react';
import Aux from '../../hoc/Aux'
import classes from './layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    

    const [sideDrawer, setSideDrawer] = useState(false)

    const sideDrawerHandler = () => {
        setSideDrawer(false)
    }

    const menuOpenHandler = () => {
       setSideDrawer(true)
    }

 

        return (

            <Aux>
                <SideDrawer closeSideDrawer={sideDrawerHandler} open={sideDrawer}/>
                <Toolbar open={menuOpenHandler}/>
                <main className={classes.Content}>{props.children}</main>
            </Aux>
        )
    
}


export default Layout;