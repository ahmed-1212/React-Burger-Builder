import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actionTypes from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import { validationHandler } from '../../shared/utility'


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email*'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valide: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valide: false,
                touched: false
            },
        },
        isSignup: true
    }
    
    componentDidMount () {
        if(!this.props.building && this.props.redirect !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }





    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valide: validationHandler(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updateControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    onAuthSignHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render () {

        const formElementsArray = [];

        for (let key in this.state.controls) {

            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
           return <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valide={!formElement.config.valide}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}  
            changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
        })

        if(this.props.loading) {
            form = <Spinner />
        }

        let error = null;

        if(this.props.error) {
            error = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {this.props.isSign ? <Redirect to={this.props.redirect} /> : null}
                {error}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button clicked={this.onAuthSignHandler} btnType="Danger">Switch To {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionTypes.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actionTypes.authRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isSign: state.auth.isSign,
        building: state.burgerBuilder.building,
        redirect: state.auth.redirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);