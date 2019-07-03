import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logout = () =>{
    return{
        type: actionTypes.AUTH_TIMEOUT
    };
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())        
        },expirationTime * 1000)
    }
}


export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC9yxmAzRYuxYpvXNPnW4iMXog_e_NHWtA'
        if(!signUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC9yxmAzRYuxYpvXNPnW4iMXog_e_NHWtA'
        }

        axios.post(url, authData)
        .then(resp => {
            console.log(resp);
            dispatch(authSuccess(resp.data));
            dispatch(checkAuthTimeout(resp.data.expiresIn))
        })
        .catch(err => {
            console.log(err.response);
            dispatch(authFail(err.response.data.error));
        })
    };
};

export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}