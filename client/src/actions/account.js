import api from '../utils/api';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
    REGISTER_FAIL,
    ADD_FUNDS,
} from './types';


export const addFunds = (budget, isAdd) => async (dispatch) => {
    try {
        let res;

        if (isAdd)
            res = await api.post('/account/add', { budget: budget });
        else
            res = await api.post('/account/withdraw', { budget: budget });
        dispatch({
            type: ADD_FUNDS,
            payload: res.data
        });
        dispatch(loadUser());
        if (isAdd) {
            dispatch(
                setAlert('Add Funds succeed', 'success')
            )
        }
        else {
            dispatch(
                setAlert('Withdraw succeed', 'danger')
            )
        }
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
