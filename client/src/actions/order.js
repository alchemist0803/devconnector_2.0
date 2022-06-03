import api from '../utils/api';
import { setAlert } from './alert';
import { getUser } from './auth';
import {
    CREATE_ORDER,
    CANCEL_ORDER,
    PAY_ORDER,
    ACCEPT_ORDER,
    REFUSE_ORDER,
    PROFILE_ERROR,
} from './types';

export const createOrder =
    (formData, id, edit) =>
        async (dispatch) => {
            try {
                let res;
                if (edit)
                    res = await api.post(`/order/update/`, { formData, id });

                else
                    res = await api.post(`/order/create/`, { formData, id });

                dispatch({
                    type: CREATE_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                if (edit)
                    dispatch(
                        setAlert('Order Updated', 'success')
                    );
                else
                    dispatch(
                        setAlert('Order Created', 'success')
                    );
            } catch (err) {
                console.log(err);
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };

export const cancelOrder =
    (walkerName, ownerName, dogName) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/cancel/`, { walkerName, ownerName, dogName });

                dispatch({
                    type: CANCEL_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Canceled', 'success')
                );
            } catch (err) {
                console.log(err);
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const acceptOrder =
    (walkerName, ownerName, dogName) =>
        async (dispatch) => {
            try {
                console.log("action", walkerName, ownerName, dogName)
                const res = await api.post(`/order/accept/`, { walkerName, ownerName, dogName });

                dispatch({
                    type: ACCEPT_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Accepted', 'success')
                );
            } catch (err) {
                console.log(err);
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const refuseOrder =
    (walkerName, ownerName, dogName) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/refuse/`, { walkerName, ownerName, dogName });

                dispatch({
                    type: REFUSE_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Refused', 'success')
                );
            } catch (err) {
                console.log(err);
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const payOrder =
    (walkerName, ownerName, dogName, budget) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/pay/`, { walkerName, ownerName, dogName, budget });

                dispatch({
                    type: PAY_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order paid successfully', 'success')
                );
            } catch (err) {
                console.log(err);
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
