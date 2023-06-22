import axios from "../../utils/axios";
import * as Types from "../constants/OrderTypes";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";

export const cashInOrder = (product, router) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/order/orderincash", product)
    .then((response) => {
      dispatch({
        type: Types.CASH_CREATE_ORDER,
        payload: {
          order: response.data,
        },
      });
      router.push("/myaccount");
      dispatch(alertAction("Ordered successfully!"));
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch({
        type: Types.CASH_CREATE_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

export const createOrder = (product, router) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/order/addorder", product)
    .then((response) => {
      router.push(response.data.sessionUrl);
    })
    .catch((err) => {
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

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
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
    });
};

export const getMyOrders = () => (dispatch) => {
  axios
    .get(`/order/getmyorders`)
    .then((response) => {
      dispatch({
        type: Types.GET_MY_ORDER,
        payload: {
          orders: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_MY_ORDER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
    });
};
