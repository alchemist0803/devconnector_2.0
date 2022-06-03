import api from '../utils/api';
import { setAlert } from './alert';
import { getUser } from './auth';
import { loadUser } from './auth';

import {
    REGISTER_FAIL,
    MESSAGE_SEND,
    MESSAGE_RECIEVE

} from './types';


export const getMessage = (otherName) => async (dispatch) => {
    try {
        const res = await api.post('/message/get', {"otherName": otherName});
        dispatch({
            type: MESSAGE_RECIEVE,
            payload: res.data
        });
        dispatch(getUser());
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};
export const messages = (message) => async (dispatch) => {
    try {
        const res = await api.post('/message', message);
        dispatch({
            type: MESSAGE_SEND,
            payload: res.data
        });
        dispatch(getUser());
        dispatch(loadUser());
        dispatch(
            setAlert('Message Sent', 'success')
        );
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};