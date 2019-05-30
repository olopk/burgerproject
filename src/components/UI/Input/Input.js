import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    
    let inputtype = null;

    switch(props.inputtype){
        case('input'):
            inputtype = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case('textarea'):
            inputtype = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        default:
            inputtype = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputtype}
        </div>
    )
}

export default Input;