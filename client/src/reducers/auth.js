import {
    REGISTER_SUCCESS,
    DELETE_USER,
    USER_LOADED,
    USER_UPDATED,
    ALL_USER_LOADED,
    APPROVE_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    // profile
    GET_PROFILE,
    DELETE_PROFILE,
    //ORDER
    CREATE_ORDER,
    CANCEL_ORDER,
    PAY_ORDER,
    ACCEPT_ORDER,
    REFUSE_ORDER,
  //account
    ADD_FUNDS,
    //message
    MESSAGE_SEND,
    MESSAGE_RECIEVE
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE: {
            return {
                ...state,
                user: payload
            }
        }
        case DELETE_PROFILE: {
            return {
                ...state,
                user: payload
            }
        }
        case CREATE_ORDER: {
            return {
                ...state,
                user: payload
            }
        }
        case CANCEL_ORDER: {
            return {
                ...state,
                user: payload
            }
        }
        case PAY_ORDER: {
            return {
                ...state,
                user: payload
            }
        }
        case ACCEPT_ORDER: {
            return {
                ...state,
                user: payload
            }
        }
        case REFUSE_ORDER: {
            return {
                ...state,
                user: payload
            }
        }
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        }
        case ALL_USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                allUser: payload
            };
        }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case USER_UPDATED:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case DELETE_USER: {
            return {
                ...state,
                allUser: payload
            };
        }
        case APPROVE_USER: {
            return {
                ...state,
                allUser: payload
            };
        }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case ADD_FUNDS: {
            return {
                ...state,
                user: payload
            };
        }
        case MESSAGE_SEND: {
            return {
                ...state,
                user: payload
            }
        }
        case MESSAGE_RECIEVE: {
            return {
                ...state,
                user: payload
            }
        }
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}

export default authReducer;
