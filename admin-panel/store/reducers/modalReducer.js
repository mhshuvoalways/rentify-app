import * as Types from "../constants/ModalType";
import * as ClearDataTypes from "../constants/ClearDataTypes";

const modalReducer = (
  state = {
    toggle: false,
    id: "",
  },
  action
) => {
  switch (action.type) {
    case Types.MODEL: {
      return { toggle: !state.toggle, id: action.payload || "" };
    }
    case ClearDataTypes.CLEAR_DATA: {
      return {
        toggle: false,
        id: "",
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
