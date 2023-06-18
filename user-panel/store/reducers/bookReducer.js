import * as Types from "../constants/BookTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  bookedProdcuts: [],
  error: null,
};

const bookReducer = (state = init, action) => {
  switch (action.type) {
    case Types.BOOK_PRODUCT: {
      const temp = [...state.bookedProdcuts];
      temp.push(action.payload.bookProducts);
      return {
        ...state,
        bookedProdcuts: temp,
        error: null,
      };
    }
    case Types.BOOK_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.GET_BOOK_PRODUCT: {
      return {
        ...state,
        bookedProdcuts: action.payload.bookProducts,
        error: null,
      };
    }
    case Types.GET_BOOK_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.DELETE_BOOK_PRODUCT: {
      const temp = [...state.bookedProdcuts];
      return {
        ...state,
        bookedProdcuts: temp.filter(
          (el) => el._id !== action.payload.bookProduct._id
        ),
        error: null,
      };
    }
    case Types.DELETE_BOOK_PRODUCT_BOOK_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.UPDATE_BOOK_PRODUCT: {
      const temp = [...state.bookedProdcuts];
      const findIndex = temp.findIndex(
        (el) => el._id === action.payload.bookProduct._id
      );
      temp[findIndex] = action.payload.bookProduct;
      return {
        ...state,
        bookedProdcuts: temp,
        error: null,
      };
    }
    case Types.UPDATE_BOOK_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        bookedProdcuts: [],
        error: null,
      };
    }
    default:
      return state;
  }
};

export default bookReducer;
