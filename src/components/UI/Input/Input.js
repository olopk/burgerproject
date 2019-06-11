import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    
    let inputtype = null;
    
    let inputClass = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }

    switch(props.inputtype){
        case('input'):
            inputtype = <input className={inputClass.join(' ')}  onChange={props.change}{...props.elementConfig} value={props.value}/>;
            break;
        case('textarea'):
            inputtype = <textarea className={inputClass.join(' ')} onChange={props.change} {...props.elementConfig} value={props.value}/>;
            break;
        case('select'):
            inputtype = ( 
                <select className={inputClass.join(' ')} onChange={props.change} 
                {...props.elementConfig} 
                value={props.value}> 
                    {props.elementConfig.options.map(option =>(
                        <option 
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputtype = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputtype}
        </div>
    )
}

export default Input;