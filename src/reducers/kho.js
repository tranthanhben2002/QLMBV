import {
  KHO_LIST_LOAD,
  KHO_LIST_LOAD_SUCCESS,
  KHO_LIST_LOAD_FAIL,

  KHO_ONE_LOAD,
  KHO_ONE_LOAD_SUCCESS,
  KHO_ONE_LOAD_FAIL,

  KHO_POST,
  KHO_POST_SUCCESS,
  KHO_POST_FAIL,

  KHO_PUT,
  KHO_PUT_SUCCESS,
  KHO_PUT_FAIL,

  KHO_DELETE,
  KHO_DELETE_SUCCESS,
  KHO_DELETE_FAIL,

  KHO_GET,
  KHO_GET_SUCCESS,
  KHO_GET_FAIL,

  KHO_RESET
} from 'actions/actionTypes';

const initialState = {
  loaded: false
}

export default function kho(state = initialState, action = {}){
  switch (action.type){
    case KHO_LIST_LOAD:
      return {
        ...state,
        loading: true
      };
    case KHO_LIST_LOAD_SUCCESS:
      return {
        ...state,
        loadding: false,
        loaded: true,
        reloadList: false,
        list: action.result.items,
        paging: action.result.paging
      };
    case KHO_LIST_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        reloadList: false,
        paging: null,
        error: action.result
      };

    case KHO_ONE_LOAD:
      return {
        ...state,
        loadingOne: true
      };
    case KHO_ONE_LOAD_SUCCESS:
      return {
        ...state,
        loadingOne: false,
        item: action.result
      };
    case KHO_ONE_LOAD_FAIL:
      return {
        ...state,
        loadingOne: false,
        item: null,
        error: action.result
      };
    case KHO_GET:
      return {
        ...state,
        getding: true
      };
    case KHO_GET_SUCCESS:
      return {
        ...state,
        getding: false,
        editItem: action.result
      };
    case KHO_GET_FAIL:
      return {
        ...state,
        getding: false,
        editItem: {},
        error: action.result
      };
    case KHO_POST:
      return {
        ...state,
        posting: true
      };
    case KHO_POST_SUCCESS:
      return {
        ...state,
        reset: true,
        editItem: action.result,
        reloadList: true,
        message: true,
        posting: false,
      };
    case KHO_POST_FAIL:
      return {
        ...state,
        editItem: null,
        message: false,
        posting: false,
        errorPost: action.result
      };

    case KHO_PUT:
      return {
        ...state,
        posting: true
      };
    case KHO_PUT_SUCCESS:
      return {
        ...state,
        reset: true,
        editItem: action.result,
        message: true,
        posting: false,
      };
    case KHO_PUT_FAIL:
      return {
        ...state,
        editItem: null,
        message: false,
        posting: false,
        errorPost: action.result
      };

    case KHO_DELETE:
      return {
        ...state,
        deleting: true
      };
    case KHO_DELETE_SUCCESS:
      return {
        ...state,
        reset: true,
        deleting: false,
        item: null
      };
    case KHO_DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        item: null,
        errorDel: action.result
      };

    case KHO_RESET:
      return {
        ...state,
        loaded: false,
        editItem: null,
        reloadList: true,
        message: false,
        errorPost:null
      };
    default:
      return state;
  }
}
