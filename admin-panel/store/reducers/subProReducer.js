import * as ClearDataTypes from "../constants/ClearDataTypes";
import * as Types from "../constants/SubProTypes";

const init = {
  products: [],
  allProducts: [],
  error: null,
};

const productReducer = (state = init, action) => {
  switch (action.type) {
    case Types.CREATE_PRODUCT: {
      const temp = [...state.products];
      temp.push(action.payload.product);
      return {
        ...state,
        products: temp,
        error: null,
      };
    }
    case Types.CREATE_PRODUCT: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.UPDATE_PRODUCT: {
      const temp = [...state.products];
      const findIndex = temp.findIndex(
        (el) => el._id === action.payload.product._id
      );
      temp[findIndex] = action.payload.product;
      return {
        ...state,
        products: temp,
        error: null,
      };
    }
    case Types.UPDATE_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.GET_PRODUCT: {
      return {
        ...state,
        products: action.payload.products,
        error: null,
      };
    }
    case Types.GET_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.GET_ALL_PRODUCT: {
      return {
        ...state,
        allProducts: action.payload.products,
        error: null,
      };
    }
    case Types.GET_ALL_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.DELETE_PRODUCT: {
      const temp = [...state.products];
      const categories = temp.filter(
        (el) => el._id !== action.payload.product._id
      );
      return {
        ...state,
        products: categories,
        error: null,
      };
    }
    case Types.DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        products: [],
        allProducts: [],
        error: null,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
