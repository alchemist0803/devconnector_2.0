import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_USER,
  USER_LOADED,
  USER_UPDATED,
  ALL_USER_LOADED,
  APPROVE_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/getUser');
    dispatch({
      type: ALL_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(getUser());
    dispatch(
      setAlert('Register Successed', 'success')
  )
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

export const updateUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/update', formData);
    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(getUser());
    dispatch(
      setAlert('Update Succeed', 'success')
  )
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

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(getUser());
    dispatch(
      setAlert('Login Succeed', 'success')
  )
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const forgot = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/resign', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(getUser());
    dispatch(
      setAlert('Password Changed', 'success')
  )
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
export const logout = () => ({ type: LOGOUT });
export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/auth/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
    dispatch(
      setAlert('User Deleted', 'danger')
  )
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const approveUser = (id, status) => async (dispatch) => {
  try {
    const res = await api.get(`/auth/approve/${id}`);
    dispatch({
      type: APPROVE_USER,
      payload: res.data
    });
    dispatch(
      setAlert('User Approved', 'success')
  )
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};