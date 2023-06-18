import * as Types from "../constants/EnableBtnType";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const enableBtnReducer = (state = true, action) => {
  switch (action.type) {
    case Types.ENABLE_BTN: {
      return action.payload;
    }
    case ClearDataTypes.CLEAR_DATA: {
      return true;
    }
    default:
      return state;
  }
};

export default enableBtnReducer;