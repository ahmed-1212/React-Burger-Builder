import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes  from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/action/index'
import { validationHandler } from '../../../shared/utility'

class ContactData extends Component {

    state ={
        contactForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name*'
                },
                value: '',
                validation: {
                    required: true
                },
                valide: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email*'
                },
                value: '',
                validation: {
                    required: true
                },
                valide: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street*'
                },
                value: '',
                validation: {
                    required: true
                },
                valide: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valide: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country*'
                },
                value: '',
                validation: {
                    required: true
                },
                valide: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valide: true
            },
            
        },
        formIsValide: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formOrder = {};
        for (let inputFormID in this.state.contactForm) {
            formOrder[inputFormID] = this.state.contactForm[inputFormID].value
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: formOrder,
            userId: this.props.userId
        };

       this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, inputID) => {
        const updatedOrderForm = {
            ...this.state.contactForm
        }

        const updatedInputForm = {
            ...updatedOrderForm[inputID]
        }

        updatedInputForm.value = event.target.value;
        updatedInputForm.valide = validationHandler(updatedInputForm.value, updatedInputForm.validation);
        updatedInputForm.touched = true;
        updatedOrderForm[inputID] = updatedInputForm;

        let formIsValide = true;

        for(let inputIdentfire in updatedOrderForm) {
            formIsValide = updatedOrderForm[inputIdentfire].value && formIsValide 
        }
        this.setState({contactForm: updatedOrderForm, formIsValide: formIsValide});

        
    }
    render () {

        const formElementsArray = [];

        for (let key in this.state.contactForm) {

            formElementsArray.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valide={!formElement.config.valide}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}  
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button disabled={!this.state.formIsValide} clicked={this.orderHandler} btnType="Success">Order Now</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter The Contact Form Please.</h3>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseReady(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));