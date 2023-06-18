import * as Types from "../constants/ProductTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";
import modalAction from "./modalAction";

export const createProduct = (product) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/product/addproduct", product)
    .then((response) => {
      dispatch({
        type: Types.CREATE_PRODUCT,
        payload: {
          product: response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(modalAction());
    })
    .catch((err) => {
      dispatch({
        type: Types.CREATE_PRODUCT_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response.data));
    });
};

export const editProduct = (id, product) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .put("/product/editproduct/" + id, product)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_PRODUCT,
        payload: {
          product: response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(modalAction());
    })
    .catch((err) => {
      dispatch({
        type: Types.UPDATE_PRODUCT_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response.data));
    });
};

export const getProducts = () => (dispatch) => {
  axios
    .get(`/product/getproducts`)
    .then((response) => {
      dispatch({
        type: Types.GET_PRODUCT,
        payload: {
          products: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_PRODUCT_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(alertAction(err.response.data));
    });
};

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`/product/deleteproduct/` + id)
    .then((response) => {
      dispatch({
        type: Types.DELETE_PRODUCT,
        payload: {
          product: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_PRODUCT_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(alertAction(err.response.data));
    });
};
