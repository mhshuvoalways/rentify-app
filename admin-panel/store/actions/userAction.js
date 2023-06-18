import * as Types from "../constants/UserTypes";
import setAuthToken from "../../utils/setAuthToken";
import axios from "../../utils/axios";
import jwt_decode from "jwt-decode";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";
import clearAction from "./clearAction";

export const adminLogin = (user, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/user/adminlogin", user)
    .then((response) => {
      var decoded = jwt_decode(response.data.token);
      dispatch({
        type: Types.LOGIN_USER,
        payload: {
          user: decoded,
        },
      });
      navigate.push("/");
      dispatch(enableBtn(true));
      setAuthToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      dispatch(alertAction("Welcome back!"));
    })
    .catch((err) => {
      dispatch({
        type: Types.LOGIN_USER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

export const isAuthenticate = (router) => (dispatch) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) {
    var decoded = jwt_decode(token);
    var dateNow = new Date();
    if (decoded.exp * 1000 < dateNow.getTime()) {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: false,
        },
      });
      dispatch(logout(router));
    } else {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: true,
        },
      });
      dispatch(getMyAccount());
    }
  } else {
    dispatch({
      type: Types.ISAUTHENTICATE,
      payload: {
        isAuthenticate: false,
      },
    });
    dispatch(logout(router));
  }
};

export const getMyAccount = () => (dispatch) => {
  axios
    .get("/user/getmyaccount")
    .then((res) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: err.response.data,
      });
      dispatch(alertAction(err.response.data));
    });
};

export const getAllUser = () => (dispatch) => {
  axios
    .get("/user/getusers")
    .then((res) => {
      dispatch({
        type: Types.GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_USERS_ERROR,
        payload: err.response.data,
      });
      dispatch(alertAction(err.response.data));
    });
};

export const deleteUser = (id) => (dispatch) => {
  axios
    .delete("/user/deleteuser/" + id)
    .then((res) => {
      dispatch({
        type: Types.DELETE_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_USERS_ERROR,
        payload: err.response?.data,
      });
      dispatch(alertAction(err.response?.data));
    });
};

export const logout = (router) => (dispatch) => {
  dispatch({
    type: Types.LOGOUT_USER,
    payload: {
      isAuthenticate: false,
    },
  });
  dispatch(clearAction());
  router.push("/login");
  typeof window !== "undefined" && localStorage.removeItem("token");
  setAuthToken("");
};
