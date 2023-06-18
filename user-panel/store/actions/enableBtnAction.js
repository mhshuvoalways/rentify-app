import * as Types from "../constants/EnableBtnType";

const enableBtn = (value) => (dispatch) => {
  dispatch({
    type: Types.ENABLE_BTN,
    payload: value,
  });
};

export default enableBtn;