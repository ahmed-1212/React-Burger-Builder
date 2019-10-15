import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuc = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUC,
        idToken: idToken,
        userId: userId 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTime = (time) => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(authLogout())
        }, time * 1000)
    }
}


export const auth = (email, password, isSignup) => {
    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDo5V7wI3wt5ytbxDa-WlbqKoWAO6ZanwQ';

        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDo5V7wI3wt5ytbxDa-WlbqKoWAO6ZanwQ'
        }
        axios.post(url, authData)
        .then(response => {
            
            const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expireDate', expireDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuc(response.data.idToken, response.data.localId))
            dispatch(checkAuthTime(response.data.expiresIn));
        }).catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}


export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout())
        } else {
            const expireDate = new Date(localStorage.getItem('expireDate'))
            if(expireDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuc(token, userId));
                dispatch(checkAuthTime((expireDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}