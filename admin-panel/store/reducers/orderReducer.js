import * as Types from "../constants/OrderTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  orders: [],
  error: null,
};

const orderReducer = (state = init, action) => {
  switch (action.type) {
    case Types.GET_ORDER: {
      return {
        ...state,
        orders: action.payload.order,
        error: null,
      };
    }
    case Types.GET_ORDER_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.UPDATE_ORDER: {
      const temp = [...state.orders];
      const findIndex = temp.findIndex(
        (el) => el._id === action.payload.order._id
      );
      temp[findIndex] = action.payload.order;
      return {
        ...state,
        orders: temp,
        error: null,
      };
    }
    case Types.UPDATE_ORDER_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.DELETE_ORDER: {
      const temp = [...state.orders];
      const orders = temp.filter((el) => el._id !== action.payload.order._id);
      return {
        ...state,
        orders: orders,
        error: null,
      };
    }
    case Types.DELETE_ORDER_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        orders: [],
        error: null,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
