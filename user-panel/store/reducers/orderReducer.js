import * as Types from "../constants/OrderTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  orders: [],
  error: null,
};

const orderReducer = (state = init, action) => {
  switch (action.type) {
    case Types.CASH_CREATE_ORDER: {
      const temp = [...state.orders];
      temp.push(action.payload.order);
      return {
        ...state,
        orders: temp,
        error: null,
      };
    }
    case Types.CASH_CREATE_ORDER_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
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

    case Types.GET_MY_ORDER: {
      return {
        ...state,
        orders: action.payload.orders,
        error: null,
      };
    }
    case Types.GET_MY_ORDER_ERROR: {
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
