import React from 'react';
import classes from './Input.css'

const Input = props => {

    let inputElement = null;

    let inputClasses = [classes.InputElement];

    let validationError = null;
    if (props.valide && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    if (props.valide && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Valide)
    }

    switch(props.elementType) {
        case ( 'input' ):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            break;
        case ( 'textarea' ):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case ( 'select' ):
                inputElement = (
                    <select onChange={props.changed} className={inputClasses.join(' ')}  value={props.value}>
                        {props.elementConfig.option.map(option => (
                            <option value={option.value} key={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                )
                break;
        default:
            inputElement = <input  className={classes.InputElement} {...props.elementConfig} value={props.value} />
    }

    return (

        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input;