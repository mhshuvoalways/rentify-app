import * as Types from "../constants/BookTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";

export const bookProduct = (product, router) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/book/addbook", product)
    .then((response) => {
      dispatch({
        type: Types.BOOK_PRODUCT,
        payload: {
          bookProducts: response.data,
        },
      });
      router.push("/book");
      dispatch(alertAction("Booked successfully!"));
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch({
        type: Types.BOOK_PRODUCT_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

export const getBookProduct = () => (dispatch) => {
  axios
    .get(`/book/getmybooks`)
    .then((response) => {
      dispatch({
        type: Types.GET_BOOK_PRODUCT,
        payload: {
          bookProducts: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_BOOK_PRODUCT_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(alertAction(err.response?.data));
    });
};

export const deleteBookProduct = (id) => (dispatch) => {
  axios
    .delete(`/book/deletebook/` + id)
    .then((response) => {
      dispatch({
        type: Types.DELETE_BOOK_PRODUCT,
        payload: {
          bookProduct: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_BOOK_PRODUCT,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(alertAction(err.response?.data));
    });
};

export const updateBookProduct = (id, updateBook) => (dispatch) => {
  axios
    .put(`/book/updatebook/` + id, updateBook)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_BOOK_PRODUCT,
        payload: {
          bookProduct: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.UPDATE_BOOK_PRODUCT_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(alertAction(err.response?.data));
    });
};
