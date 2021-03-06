import {
  ME_LOAD,
  ME_LOAD_SUCCESS,
  ME_LOAD_FAIL,
  LOGIN_LOAD,
  LOGIN_LOAD_SUCCESS,
  LOGIN_LOAD_FAIL,
  LOGOUT_LOAD,
  LOGOUT_LOAD_SUCCESS,
  LOGOUT_LOAD_FAIL,
} from '../actions/actionTypes';

const initialState = {
  loaded: false
};
export default function user(state = initialState, action = {}) {
    switch (action.type) {
      case ME_LOAD:
        return {
          ...state,
          loadingUser: true
        };
      case ME_LOAD_SUCCESS:
        return {
          ...state,
          loadingUser: false,
          loaded: true,
          user: action.result
        };
      case ME_LOAD_FAIL:
        return {
          ...state,
          loadingUser: false,
          loaded: true,
          user: null,
          errorUser: action.error
        }
      case LOGIN_LOAD:
        return {
          ...state
        };
      case LOGIN_LOAD_SUCCESS:
        location.assign('/');
        return {
          ...state
        };
      case LOGIN_LOAD_FAIL:
        return {
          ...state,
          errorLogin: action.error
        }
      case LOGOUT_LOAD:
        return {
          ...state
        };
      case LOGOUT_LOAD_SUCCESS:
        location.assign('/');
        return {
          ...state,
          user: null
        };
      case LOGOUT_LOAD_FAIL:
        return {
          ...state,
          errorLogout: action.error
        }
      default:
        return state;
    }
}

export function isLoaded(globalState){
  return globalState.user && globalState.user.loaded;
}
