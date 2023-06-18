import * as Types from "../constants/SubProTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";
import modalAction from "./modalAction";

export const createProduct = (product) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/subproduct/addproduct", product)
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
    .put("/subproduct/editproduct/" + id, product)
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

export const getProducts = (productId) => (dispatch) => {
  axios
    .get(`/subproduct/getproducts/` + productId)
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

export const getAllSubProducts = () => (dispatch) => {
  axios
    .get(`/subproduct/getallproducts`)
    .then((response) => {
      dispatch({
        type: Types.GET_ALL_PRODUCT,
        payload: {
          products: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_ALL_PRODUCT_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(alertAction(err.response.data));
    });
};

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`/subproduct/deleteproduct/` + id)
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
