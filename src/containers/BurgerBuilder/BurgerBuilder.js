import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/action/index'




class BurgerBuilder extends Component {

    state = {
        ordering: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchasable = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKeys => {
            return ingredients[igKeys]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        return sum > 0
    }


    orderingHandler = () => {
        if(this.props.isSign) {
            this.setState({
                ordering: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    modalClosedHandler = () => {
        this.setState({
            ordering: false
        })
    }

    orderCompleteHandler = () => { 
        this.props.history.push('/checkout')
    }

    render () {

        const disableInfo = {
            ...this.props.ing
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null

        let burger = this.props.error ? <p style={{position: 'relative',top: '50px', textAlign: 'center'}}>Ingredients Are Not Available At The Moment</p> : <Spinner />

        if (this.props.ing) {

            burger = (
                <Aux>
                    <Burger  ingredients={this.props.ing} />
                    <BurgerControls
                     addIngredients={this.props.onIngredientAdded}
                     removeIngredients={this.props.onIngredientRemoved}
                     disabled={disableInfo}
                     ordering={this.orderingHandler}
                     purchasable={this.updatePurchasable(this.props.ing)}
                     isAuth={this.props.isSign}
                     price={this.props.price}
                     />
                </Aux>  
            )
            orderSummary = <OrderSummary ingredients={this.props.ing} 
            modalClosed={this.modalClosedHandler} 
            orderComplete={this.orderCompleteHandler}
            orderPrice={this.props.price}/>
        } 

        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isSign: state.auth.isSign
    }
}

const mapDisppatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onSetAuthRedirectPath: (path) => dispatch(actions.authRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDisppatchToProps)(withErrorHandler(BurgerBuilder, axios));