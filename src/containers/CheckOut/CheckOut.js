import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckOutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData.js'
import * as actionTypes from '../../store/action/index'

class CheckOut extends Component {
    
    componentWillMount ()  {
        this.props.onPurchaseInit();
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-form')
    }
    render () {

        let summary = <Redirect  to="/"/>

        if (this.props.ing) {
            summary = (
                <div>
                    
                    <CheckOutSummary 
                        ingredients={this.props.ing}
                        checkoutContinue={this.checkoutContinueHandler}
                        checkoutCancel={this.checkoutCancelHandler}
                        />
                    <Route 
                        path={this.props.match.path + '/contact-form'} 
                        component={ContactData}
                    />
                </div>
            )
        }

        const purchaseState = this.props.purchased ? <Redirect  to="/"/> : null;
        return (

            <div>
                {purchaseState}
                {summary}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => dispatch(actionTypes.purchaseInit)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
