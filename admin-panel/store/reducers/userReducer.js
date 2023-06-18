import * as Types from "../constants/UserTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  isAuthenticate: false,
  user: {},
  allUser: [],
  error: null,
};

const userReudcer = (state = init, action) => {
  switch (action.type) {
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

    case Types.GET_USERS: {
      return {
        ...state,
        allUser: action.payload,
      };
    }
    case Types.GET_USERS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case Types.DELETE_USERS: {
      const temp = [...state.allUser];
      const alluser = temp.filter(
        (el) => el._id !== action.payload._id
      );
      return {
        ...state,
        allUser: alluser,
      };
    }
    case Types.DELETE_USERS: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case Types.LOGOUT_USER: {
      return {
        isAuthenticate: false,
        user: {},
        error: null,
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
