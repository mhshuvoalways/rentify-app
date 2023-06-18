import * as Types from "../constants/UserTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  isAuthenticate: false,
  user: {},
  error: null,
};

const userReudcer = (state = init, action) => {
  switch (action.type) {
    case Types.REGISTER: {
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };
    }
    case Types.REGISTER_ERROR: {
      return {
        ...state,
        isAuthenticate: false,
        user: {},
        error: action.payload.error,
      };
    }

    case Types.LOGIN_USER: {
      return {
        ...state,
        isAuthenticate: Object.keys(action.payload.user).length > 0,
        user: action.payload.user,
        error: null,
      };
    }
    case Types.LOGIN_USER_ERROR: {
      return {
        ...state,
        isAuthenticate: false,
        user: {},
        error: action.payload.error,
      };
    }

    case Types.ISAUTHENTICATE: {
      return {
        ...state,
        isAuthenticate: action.payload.isAuthenticate,
      };
    }
    case Types.LOGOUT_USER: {
      return {
        isAuthenticate: false,
        user: {},
        error: null,
      };
    }

    case Types.GET_MYACCOUT: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case Types.GET_MYACCOUT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        isAuthenticate: false,
        user: {},
        error: null,
      };
    }
    default:
      return state;
  }
};

export default userReudcer;
