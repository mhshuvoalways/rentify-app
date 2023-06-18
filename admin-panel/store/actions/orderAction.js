import * as Types from "../constants/OrderTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";

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
