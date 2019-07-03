import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Auth extends Component{
    
    state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            isSignUp: true
    }

    componentDidMount(){
        if(!this.props.isBuild && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
        }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }

    signUpModeHandler = () =>{
        this.setState(prevState => {
            return{
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){

        const formElementsArray = [];

        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                inputtype={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                change={(event) => this.inputChangedHandler(event, formElement.id)}    
            />

        ))

        
        let isAuthenticated = null;

        if(this.props.isAuth){
            isAuthenticated = <Redirect to={this.props.authRedirectPath} />;
            console.log(this.props.authRedirectPath);
        }


        if(this.props.loading){
            form = <Spinner/>
        }

        let error = null;

        if(this.props.error){
            error = (<p>{this.props.error.message}</p>);
        }

        return(
            <div className={classes.Auth}>
                {isAuthenticated}
                {error}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="Success">SUBMIT</Button>
                </form>
                <Button type="Danger" clicked={this.signUpModeHandler}>{this.state.isSignUp ? 'SWITCH TO SIGNIN' : 'SWITCH TO SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.userId !== null,
        isBuild: state.burgerBuilder.isBuild,
        authRedirectPath: state.auth.authRedirect
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);