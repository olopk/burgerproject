import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const modal = (props) =>(
    <Aux>
        <Backdrop show={props.show} backdropHandler={props.backdropHandler}/>
        <div className={classes.Modal}
            style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}
            >
            {props.children}
        </div>
    </Aux>
);

export default modal;