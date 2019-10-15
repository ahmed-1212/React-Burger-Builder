import React, { Component } from 'react';
import Orders from '../../components/Orders/Orders.js'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Order extends Component {
    

    componentDidMount () {
        this.props.onOrderInit(this.props.token, this.props.userId);
    }

    render () {

        let order = <Spinner />

        if(!this.props.loading) {
            order = this.props.orders.map(order => (
                    <Orders
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    />
            ))
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderInit: (token, userId) => dispatch(actionTypes.order(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Order, axios));
