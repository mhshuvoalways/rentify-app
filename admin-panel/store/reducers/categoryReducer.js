import * as Types from "../constants/CategoryTypes";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const init = {
  categories: [],
  error: null,
};

const categoryReducer = (state = init, action) => {
  switch (action.type) {
    case Types.CREATE_CATEGORY: {
      const temp = [...state.categories];
      temp.push(action.payload.categories);
      return {
        ...state,
        categories: temp,
        error: null,
      };
    }
    case Types.CREATE_CATEGORY: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.UPDATE_CATEGORY: {
      const temp = [...state.categories];
      const findIndex = temp.findIndex(
        (el) => el._id === action.payload.category._id
      );
      temp[findIndex] = action.payload.category;
      return {
        ...state,
        categories: temp,
        error: null,
      };
    }
    case Types.UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.GET_CATEGORY: {
      return {
        ...state,
        categories: action.payload.categories,
        error: null,
      };
    }
    case Types.GET_CATEGORY_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Types.DELETE_CATEGORY: {
      const temp = [...state.categories];
      const categories = temp.filter(
        (el) => el._id !== action.payload.category._id
      );
      return {
        ...state,
        categories: categories,
        error: null,
      };
    }
    case Types.DELETE_CATEGORY_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        categories: [],
        error: null,
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
