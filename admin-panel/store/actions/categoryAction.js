import * as Types from "../constants/CategoryTypes";
import axios from "../../utils/axios";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";
import modalAction from "./modalAction";

export const createCategory = (category) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/category/addcate", category)
    .then((response) => {
      dispatch({
        type: Types.CREATE_CATEGORY,
        payload: {
          categories: response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(modalAction());
    })
    .catch((err) => {
      dispatch({
        type: Types.CREATE_CATEGORY_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response.data));
    });
};

export const editCategory = (id, category) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .put("/category/editcate/" + id, category)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_CATEGORY,
        payload: {
          category: response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(modalAction());
    })
    .catch((err) => {
      dispatch({
        type: Types.UPDATE_CATEGORY_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response.data));
    });
};

export const getCategoires = () => (dispatch) => {
  axios
    .get(`/category/getcates`)
    .then((response) => {
      dispatch({
        type: Types.GET_CATEGORY,
        payload: {
          categories: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_CATEGORY_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(alertAction(err.response.data));
    });
};

export const deleteCategory = (id) => (dispatch) => {
  axios
    .delete(`/category/deletecate/` + id)
    .then((response) => {
      dispatch({
        type: Types.DELETE_CATEGORY,
        payload: {
          category: response.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_CATEGORY_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(alertAction(err.response.data));
    });
};
