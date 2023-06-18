import * as Types from "../constants/AlertTypes";

const alertAction = (msg) => (dispatch) => {
  dispatch({
    type: Types.ALERT_TYPE,
    payload: {
      msg: msg,
    },
  });
  setTimeout(() => {
    dispatch({
      type: Types.CLEAR_ALERT_TYPE,
    });
  }, 5000);
};

export default alertAction;
