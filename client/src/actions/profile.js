import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    DELETE_PROFILE
} from './types';

export const createProfile =
    (formData) =>
        async (dispatch) => {
            try {
                const res = await api.post('/profile/walkerProfile', formData);

                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                });

                dispatch(
                    setAlert('Profile Created', 'success')
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

export const dogProfile = (formData, edit, file) => async (dispatch) => {
    try {
        const profile = {
            file: file,
            type: formData.type,
            name: formData.name,
            birth: formData.birth,
            description: formData.description
        };
        const res = await api.post('/profile/dogProfile', profile);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(
            setAlert(edit ? "Profile Edited" : 'Profile Created', 'success')
        );
    } catch (err) {
        console.log("err", err);
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

export const deleteProfile = (id) => async (dispatch) => {
            try {
                const res = await api.delete(`/profile/deleteProfile/${id}`);
                dispatch({
                    type: DELETE_PROFILE,
                    payload: res.data
                });

                dispatch(
                    setAlert("Profile Deleted", 'success')
                );
            } catch (err) {
                console.log("err", err);
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