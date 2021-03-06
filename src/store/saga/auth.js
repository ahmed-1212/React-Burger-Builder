import { put } from 'redux-saga/effects'
import * as actionTypes from '../action/actionTypes'

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireDate');
    yield localStorage.removeItem('userId');
    yield put ({
        type: actionTypes.AUTH_LOGOUT
    });
}