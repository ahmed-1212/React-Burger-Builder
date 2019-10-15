import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility'


const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isSign: false,
    redirectPath: '/'
}

const authStart = (state, action) => {

    return updateObject(state, {
        error: null,
        loading: false
    })
}

const authSuc = (state, action) => {

    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isSign: true
    })
}

const authFail = (state, action) => {

    return updateObject(state, {
        error: action.error,
        loading: false,
        isSign: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null, isSign: false})
}

const authRedirectPath = (state, action) => {
    return updateObject(state, {redirectPath: action.path})
}
const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUC: return authSuc(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.AUTH_REDIRECT_PATH: return authRedirectPath(state, action)
        default:
            return state
    }
}

export default reducer;