import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render () {

        const orderSummary = Object.keys(this.props.ingredients).map(igKeys => {

            return  <li key={igKeys}>
                        <span style={{textTransform: 'capitalize'}}>{igKeys}</span>: {this.props.ingredients[igKeys]}
                    </li>
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>An Amazing Burger With The Following Ingredients</p>
                <ul>
                    {orderSummary}
                </ul>
                <p>Your Total Price Is: <strong>{this.props.orderPrice.toFixed(2)}</strong></p>
                <p>Continue The Checkout?</p>
                <Button btnType="Danger" clicked={this.props.modalClosed}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.orderComplete}>Complete</Button>
            </Aux>
        )

    }
}


export default OrderSummary;