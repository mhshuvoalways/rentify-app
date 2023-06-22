import * as Types from "../constants/OrderTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";
import modalAction from "./modalAction";
import enableBtn from "./enableBtnAction";

export const getOrders = () => (dispatch) => {
  axios
    .get(`/order/getorders`)
    .then((response) => {
      dispatch({
        type: Types.GET_ORDER,
        payload: {
          order: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(alertAction(err.response?.data));
    });
};

export const updateOrder = (id, order) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .put(`/order/orderupdate/` + id, order)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_ORDER,
        payload: {
          order: response.data,
        },
      });
      dispatch(modalAction());
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch({
        type: Types.UPDATE_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

export const deleteOrder = (id) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .delete(`/order/deleteorder/` + id)
    .then((response) => {
      dispatch({
        type: Types.DELETE_ORDER,
        payload: {
          order: response.data,
        },
      });
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};
