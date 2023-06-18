import * as Types from "../constants/AlertTypes";

const alertReducer = (state = [], action) => {
  switch (action.type) {
    case Types.ALERT_TYPE: {
      return typeof action.payload.msg === "object"
        ? Object.values(action.payload.msg)
        : [action.payload.msg];
    }
    case Types.CLEAR_ALERT_TYPE: {
      return [];
    }
    default:
      return state;
  }
};

export default alertReducer;
