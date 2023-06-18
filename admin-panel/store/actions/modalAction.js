import * as Types from "../constants/ModalType";

const modalAction = (id) => (dispatch) => {
  dispatch({
    type: Types.MODEL,
    payload: id,
  });
};

export default modalAction;
