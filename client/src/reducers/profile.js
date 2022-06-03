import {
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
}

export default profileReducer;
